// repository/order.js
require('./models');
const { Orders, StatusOrder, CompaniesA, Drivers, Staff } = require('./models');

const createOrder = async (orderData) => {
  try {
    const order = await Orders.create(orderData);
    return order;
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    throw error;
  }
};

const findAllOrders = async () => {
  const data = await Orders.findAll({
    include: [
      {
        model: StatusOrder,
        attributes: ['id', 'key', 'value'],
        as: 'statusorder',
      },
      {
        model: CompaniesA,
        attributes: ['id', 'name', 'address', 'contact'],
        as: 'a',
      },
      {
        model: CompaniesA,
        attributes: ['id', 'name', 'address', 'contact'],
        as: 'b',
      },
      {
        model: Drivers,
        attributes: ['id', 'name', 'carNumber', 'contact'],
        as: 'driver',
      },
      {
        model: Staff,
        attributes: ['id', 'name', 'contact'],
        as: 'staff',
      },
    ],
  });
  return data;
};

const findOrderById = async (id) => {
  const order = await Orders.findByPk(id);
  return order;
};

const updateOrder = async (id, data) => {
  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return null;
    }
    const updatedOrder = await order.update(data);
    return updatedOrder;
  } catch (error) {
    console.error('Ошибка при обновлении заказа:', error);
    throw error;
  }
};

const deleteOrder = async (id) => {
  await Orders.destroy({ where: { id } });
};

module.exports = {
  createOrder,
  findAllOrders,
  findOrderById,
  updateOrder,
  deleteOrder,
};
