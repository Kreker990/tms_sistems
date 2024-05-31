const express = require('express');
const companiesARepository = require('../repository/companiesA');

const router = express.Router();

// Обработчик создания новой компании
const createHandler = async (req, res) => {
  try {
    const { name, email, type, address, contact } = req.body;

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

    // Создаем новую запись компании
    const company = await companiesARepository.createCompanyA({
      name,
      email,
      type,
      address,
      contact
    });

    return res.status(201).json({ message: 'Точка отправки успешно добавлена.', data: company });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка', error: error.message });
  }
};

// Получение всех компаний
const getAll = async (req, res) => {
  try {
    const data = await companiesARepository.findAllCompaniesA();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

// Удаление компании по ID
const deleteById = async (req, res) => {
  try {
    await companiesARepository.deleteCompanyA(req.params.id);
    return res.json('Успешно удалена');
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при удалении', error: error.message });
  }
};

// Обновление компании по ID
const updateHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email, type, address, contact } = req.body;

  try {
    const updated = await companiesARepository.updateCompanyA(id, {
      name,
      email,
      type,
      address,
      contact
    });

    if (!updated) {
      return res.status(404).json({ message: 'Данные не найдены' });
    }

    return res.status(201).json({ message: 'Точка отправки успешно обновлена.', data: updated });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при обновлении', error: error.message });
  }
};

// Маршруты для компаний
router.post('/', createHandler);
router.get('/', getAll);
router.delete('/:id', deleteById);
router.put('/:id', updateHandler);

module.exports = router;
