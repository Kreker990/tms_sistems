const express = require('express');
const DriversRepository = require('../repository/driver');

const router = express.Router();

// eslint-disable-next-line consistent-return
const createHandler = async (req, res) => {
  try {
    const { name, carNumber, mail, contact, busy, } = req.body;

    // проверка заполненных полей;
    const fields = [
      { key: 'name', value: name },
      { key: 'carNumber', value: carNumber },
      { key: 'mail', value: mail },
      { key: 'contact', value: contact },
      { key: 'busy', value: busy }
    ];
    const errors = fields
      .filter(field => field.value === undefined || field.value === null || field.value === '') // проверяем на непустое значение
      .map(field => `заполните поле: ${field.key}`);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    DriversRepository.create({
      name,
      carNumber,
      mail,
      contact,
      busy,
    }).then((e) => {
      return res.json('Успешно');
    }).catch(() => {
      return res.status(500).json('Внутренняя ошибка БД');
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка', error: error.message });
  }
};

router.post(
  '/',
  createHandler,
);

module.exports = router;
