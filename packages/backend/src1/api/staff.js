const express = require('express');
const StaffRepository = require('../repository/staff');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generatePasswordHash } = require('../services/cryptoServices');

const router = express.Router();

const secret = process.env.JWT_SECRET;

// eslint-disable-next-line consistent-return
const createHandler = async (req, res) => {
  try {
    const { mail, password, role } = req.body;

    // проверка заполненных полей;
    const fields = [
      { key: 'mail', value: mail },
      { key: 'password', value: password },
      { key: 'role', value: role },
    ];
    const errors = fields
      .filter(field => field.value === undefined || field.value === null || field.value === '') // проверяем на непустое значение
      .map(field => `заполните поле: ${field.key}`);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const salt = crypto.randomBytes(16);
    const hashedPassword = await generatePasswordHash(password, salt);
    const user = await StaffRepository.create({ mail, hashedPassword, role, salt })
    if (user) {
      const token = jwt.sign(
        { id: user.id, mail: mail, role: role },
        secret,
        { expiresIn: '1y' }
      );
      return res.status(200).json({
        id: user.id,
        mail,
        token,
        role,
      });
    }
    return res.status(400).json({ message: 'Пользователь уже есть' })
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка', error: error.message });
  }
};

const auth = async (req, res) => {
  try {
    const { mail, password } = req.body;
    console.log(req.body)
    if (!(mail && password)) {
      return res.status(400).json({ message: 'заполните поля mail, password' });
    }

    const user = await StaffRepository.findByEmail(mail);
    if (!user) {
      console.warn({ message: 'No user exists with this email' });
      return res.status(400).json({ message: 'Пользователь не существует' });
    }

    const hashedPassword = await generatePasswordHash(password, user.salt);
    const isPasswordValid = crypto.timingSafeEqual(user.hashedPassword, hashedPassword);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Не правильный пароль' });
    }

    const token = jwt.sign(
      { id: user.id, mail: mail, },
      secret,
      { expiresIn: '1y' }
    );

    return res.json({
      token,
      role: user.role,
      id: user.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await StaffRepository.findAllData();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    await StaffRepository.delet(req.params.id);
    return res.json('Успешно удален');
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при удалении ', error: error.message });
  }
};

router.post(
  '/signup',
  createHandler,
);

router.post(
  '/auth',
  auth,
);

router.get(
  '/',
  getAll,
);
router.delete(
  '/:id',
  deleteById,
);


module.exports = router;
