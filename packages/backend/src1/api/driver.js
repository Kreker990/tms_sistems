const express = require('express');
const DriversRepository = require('../repository/driver');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generatePasswordHash } = require('../services/cryptoServices');

const router = express.Router();

const secret = process.env.JWT_SECRET;

// eslint-disable-next-line consistent-return
const createHandler = async (req, res) => {
  try {
    const { name, carNumber, mail, contact, busy, password } = req.body;

    // проверка заполненных полей;
    const fields = [
      { key: 'name', value: name },
      { key: 'carNumber', value: carNumber },
      { key: 'mail', value: mail },
      { key: 'contact', value: contact },
      { key: 'password', value: password },
    ];
    const errors = fields
      .filter(field => field.value === undefined || field.value === null || field.value === '') // проверяем на непустое значение
      .map(field => `заполните поле: ${field.key}`);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const salt = crypto.randomBytes(16);
    const hashedPassword = await generatePasswordHash(password, salt);
    const driver = await DriversRepository.create({
      name,
      carNumber,
      mail,
      contact,
      busy,
      hashedPassword,
      salt,
    });
    if (driver) {
      return res.status(201).json({ message: "Водитель успешно добавлен.", data: driver })
    }
    return res.status(400).json({ message: 'выберите другую почту' })
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка', error: error.message });
  }
};


const getDrivers = async (req, res) => {
  try {
    const data = await DriversRepository.findAllData();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret);

    const data = await DriversRepository.findById(decoded.id)
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const { name, carNumber, mail, contact, busy, password } = req.body;

  const updateData = { name, carNumber, mail, contact, busy };
  if (password) {
    const salt = crypto.randomBytes(16);
    updateData.hashedPassword = await generatePasswordHash(password, salt);
    updateData.salt = salt
  }

  try {
    const updated = await DriversRepository.update(id, updateData);

    if (!updated) {
      return res.status(419).json({ message: 'выберите другую почту', data: [] });
    }
    return res.status(201).json({ message: "Водитель успешно обновлен.", data: updated });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при обновлении', error: error.message });
  }
};


const deleteHandler = async (req, res) => {
  try {
    await DriversRepository.delet(req.params.id);
    return res.json('Успешно удален');
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при удалении ', error: error.message });
  }
};

const authDriver = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!(mail && password)) {
      return res.status(400).json({ message: 'заполните поля mail, password' });
    }

    const driver = await DriversRepository.findByEmail(mail);
    if (!driver) {
      console.warn({ message: 'No user exists with this email' });
      return res.status(400).json({ message: 'Не правильные данные' });
    }

    const hashedPassword = await generatePasswordHash(password, driver.salt);
    const isPasswordValid = crypto.timingSafeEqual(driver.hashedPassword, hashedPassword);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Не правильный пароль' });
    }

    const token = jwt.sign(
      { id: driver.id, mail: mail, },
      secret,
      { expiresIn: '1y' }
    );

    return res.json({
      token,
      id: driver.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

router.post(
  '/',
  createHandler,
);
router.post(
  '/auth',
  authDriver,
);
router.get(
  '/',
  getDrivers,
);
router.get(
  '/orders',
  getOrders,
);
router.delete(
  '/:id',
  deleteHandler,
);
router.put('/:id', updateHandler);


module.exports = router;
