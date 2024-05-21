require('./models');
const { StatusOrder } = require('./models');

const create = async (
  {
    key,
    value,
  },
) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const status = await StatusOrder.create({
      key,
      value
    });
    return status;
  } catch (error) {
    console.log(error)
    return 0;
  }
};

const updateBytId = async (id, data) => {
  try {
    const statusOrder = await StatusOrder.findByPk(id);
    if (!statusOrder) {
      return null;
    }
    const updatedCompany = await statusOrder.update(data);
    return updatedCompany;
  } catch (error) {
    console.error('Ошибка при обновлении данных точки отправки:', error);
    return null;
  }
};

const findAllData = async () => {
  const data = await StatusOrder.findAll();
  return data;
};

const delet = async (id) => StatusOrder.destroy({ where: { id } });

module.exports = {
  create,
  findAllData,
  delet,
  updateBytId,
};
