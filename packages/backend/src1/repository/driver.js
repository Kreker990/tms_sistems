require('./models');
const { Drivers } = require('./models');

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
    return 1;
  } catch (error) {
    console.log(error)
    return 0;
  }
};

const findAllData = async () => {
  const data = await Drivers.findAll();
  return data;
};

const delet = async (id) => Drivers.destroy({ where: { id } });

module.exports = {
  create,
  findAllData,
  delet,
};
