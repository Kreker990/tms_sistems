const express = require('express');
const companiesBRepository = require('../repository/companiesB');

const router = express.Router();

// eslint-disable-next-line consistent-return
const createHandler = async (req, res) => {
  try {
    const { name, email, type, address, } = req.body;

    // проверка заполненных полей;
    const fields = [
      { key: 'name', value: name },
      { key: 'email', value: email },
      { key: 'type', value: type },
      { key: 'address', value: address }
    ];
    const errors = fields
      .filter(field => field.value === undefined || field.value === null || field.value === '') // проверяем на непустое значение
      .map(field => `заполните поле: ${field.key}`);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    companiesBRepository.create({
      name,
      email,
      type,
      address,
    }).then((e) => {
      return res.json('Успешно');
    }).catch(() => {
      return res.status(500).json('Внутренняя ошибка БД');
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка', error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await companiesBRepository.findAllData();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    await companiesBRepository.delet(req.params.id);
    return res.json('Успешно удален');
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при удалении ', error: error.message });
  }
};

router.post(
  '/',
  createHandler,
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
