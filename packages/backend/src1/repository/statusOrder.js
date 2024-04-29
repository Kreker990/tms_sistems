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
    const driver = await StatusOrder.create({
      key,
      value
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
