const express = require('express');
const StatusOrderRepository = require('../repository/statusOrder');

const router = express.Router();

// eslint-disable-next-line consistent-return
const createHandler = async (req, res) => {
  try {
    const { key, value, } = req.body;

    // проверка заполненных полей;
    const fields = [
      { key: 'key', value: key },
      { key: 'value', value: value },
    ];
    const errors = fields
      .filter(field => field.value === undefined || field.value === null || field.value === '') // проверяем на непустое значение
      .map(field => `заполните поле: ${field.key}`);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const statusOrder = await StatusOrderRepository.create({
      key,
      value,
    })
    return res.status(201).json({ message: 'Статус заказа добавлена.', data: statusOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка', error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await StatusOrderRepository.findAllData();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    await StatusOrderRepository.delet(req.params.id);
    return res.json('Успешно удален');
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при удалении ', error: error.message });
  }
};

// Обновление компании по ID
const updateHandler = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;
  console.log(id)
  try { 
    const updated = await StatusOrderRepository.updateBytId(id, {
      key,
      value
    });

    if (!updated) {
      return res.status(404).json({ message: 'Данные не найдены' });
    }

    return res.status(201).json({ message: 'Статус заказа успешно обновлена.', data: updated });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Ошибка при обновлении', error: error.message });
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
router.put('/:id', updateHandler);

module.exports = router;
