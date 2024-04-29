require('./models');
const { CompaniesA } = require('./models');

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
    const driver = await CompaniesA.create({
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

module.exports = {
  create,
};
