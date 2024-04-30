require('./models');
const { CompaniesB } = require('./models');

const create = async (
  {
    name,
    email,
    type,
    address,
  },
) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const driver = await CompaniesB.create({
      name,
      email,
      type,
      address,
    });
    return 1;
  } catch (error) {
    console.log(error)
    return 0;
  }
};

const findAllData = async () => {
  const data = await CompaniesB.findAll();
  return data;
};

const delet = async (id) => CompaniesB.destroy({ where: { id } });

module.exports = {
  create,
  findAllData,
  delet,
};
