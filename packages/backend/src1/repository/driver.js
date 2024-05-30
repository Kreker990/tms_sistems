require('./models');
const { Drivers, Orders, StatusOrder, CompaniesA, Staff } = require('./models');

const create = async (
  {
    name,
    carNumber,
    mail,
    contact,
    busy,
  },
) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const driver = await Drivers.create({
      name,
      carNumber,
      mail,
      contact,
      busy,
    });
    return driver;
  } catch (error) {
    console.log(error)
    return 0;
  }
};

const findAllData = async () => {
  const data = await Drivers.findAll({
    include: {
      model: Orders,
      attributes: ['id', 'price', 'timeStart', 'comment', 'timeEnd'],
      as: 'orders',
      include: [
        {
          model: StatusOrder,
          attributes: ['id', 'key', 'value'],
          as: 'statusorder',
        }, {
          model: CompaniesA,
          attributes: ['id', 'name', 'address'],
          as: 'a',
        },
        {
          model: CompaniesA,
          attributes: ['id', 'name', 'address'],
          as: 'b',
        },
        {
          model: Staff,
          attributes: ['id', 'name', 'contact'],
          as: 'staff',
        },
      ]
    },
  });
  return data;
};

const update = async (id, data) => {
  try {
    const driver = await Drivers.findByPk(id);
    if (!driver) {
      return null;  // Если водитель не найден, возвращаем null
    }
    const updatedDriver = await driver.update(data);
    return updatedDriver;  // Возвращаем обновлённую запись
  } catch (error) {
    console.error('Ошибка при обновлении данных водителя:', error);
    return null;  // В случае ошибки возвращаем null или выбрасываем исключение
  }
};

const delet = async (id) => Drivers.destroy({ where: { id } });

module.exports = {
  create,
  findAllData,
  update,
  delet,
};
