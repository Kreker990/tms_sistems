// api/orders.js
const express = require('express');
const OrdersRepository = require('../repository/order');
const { CompaniesA } = require('../repository/models');
const { CompaniesB } = require('../repository/models');
const { Drivers } = require('../repository/models');
const { Staff } = require('../repository/models');
const { StatusOrder } = require('../repository/models');

const router = express.Router();

const createHandler = async (req, res) => {
  try {
    const { deliveryPointA, deliveryPointB, driverId, status, timeStart, timeEnd, managerId, comment, price } = req.body;
    // Проверяем существование связанных объектов
    const deliveryPointAExists = await CompaniesA.findByPk(deliveryPointA);
    const deliveryPointBExists = await CompaniesB.findByPk(deliveryPointB);
    const driverExists = await Drivers.findByPk(driverId);
    const managerExists = await Staff.findByPk(managerId);
    const statusExists = await StatusOrder.findByPk(status);

    if (!deliveryPointAExists || !deliveryPointBExists || !driverExists || !managerExists || !statusExists) {
      return res.status(400).json({ message: 'Некоторые из связанных объектов не найдены' });
    }

    const newOrder = {
      deliveryPointA,
      deliveryPointB,
      driverId,
      status,
      timeStart,
      timeEnd,
      managerId,
      comment,
      price,
    };

    const order = await OrdersRepository.createOrder(newOrder);
    return res.status(201).json({ message: 'Заказ успешно создан.', data: order });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    return res.status(500).json({ message: 'Ошибка при создании заказа', error: error.message });
  }
};

const getAllHandler = async (req, res) => {
  try {
    const orders = await OrdersRepository.findAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    return res.status(500).json({ message: 'Ошибка при получении заказов', error: error.message });
  }
};

const getByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrdersRepository.findOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error('Ошибка при получении заказа:', error);
    return res.status(500).json({ message: 'Ошибка при получении заказа', error: error.message });
  }
};

const updateHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryPointA, deliveryPointB, driverId, status, timeStart, timeEnd, managerId, comment, price } = req.body;

    // Проверяем существование связанных объектов
    const deliveryPointAExists = await CompaniesA.findByPk(deliveryPointA);
    const deliveryPointBExists = await CompaniesB.findByPk(deliveryPointB);
    const driverExists = await Drivers.findByPk(driverId);
    const managerExists = await Staff.findByPk(managerId);
    const statusExists = await StatusOrder.findByPk(status);

    if (!deliveryPointAExists || !deliveryPointBExists || !driverExists || !managerExists || !statusExists) {
      return res.status(400).json({ message: 'Некоторые из связанных объектов не найдены' });
    }

    const updatedOrder = await OrdersRepository.updateOrder(id, {
      deliveryPointA,
      deliveryPointB,
      driverId,
      status,
      timeStart,
      timeEnd,
      managerId,
      comment,
      price
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    return res.status(200).json({ message: 'Заказ успешно обновлен.', data: updatedOrder });
  } catch (error) {
    console.error('Ошибка при обновлении заказа:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении заказа', error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await OrdersRepository.deleteOrder(id);
    return res.status(200).json({ message: 'Заказ успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении заказа:', error);
    return res.status(500).json({ message: 'Ошибка при удалении заказа', error: error.message });
  }
};

router.post('/', createHandler);
router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.put('/:id', updateHandler);
router.delete('/:id', deleteHandler);

module.exports = router;
