const express = require('express');
const OrdersRepository = require('../repository/order');

const createHandler = async (req, res) => {
  try {
    const { ida, idb, iddriver,  } = req.body;

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

    companiesARepository.create({
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
    const data = await OrdersRepository.findAllData();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
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

module.exports = router;