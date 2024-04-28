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
  console.log('-----------1')
  try {
    // eslint-disable-next-line no-unused-vars
    const driver = await Drivers.create({
      name,
      carNumber,
      mail,
      contact,
      busy,
    });
    console.log('---------',name,
      carNumber,
      mail,
      contact,
      busy,'--------')
    return 1;
  } catch (error) {
    console.log(error)
    return 0;
  }
};

module.exports = {
  create,
};
