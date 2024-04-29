require('./models');
const { Staff } = require('./models');

const create = async (
  {
    mail,
    hashedPassword,
    role,
    salt
  },
) => {
  try {
    const user = await Staff.create({
      mail,
      hashedPassword,
      role,
      salt,
    });
    return user;
  } catch (error) {
    return undefined;
  }
};

const findByEmail = async (mail) => {
  const user = await Staff.findOne({
    where: {
      mail,
    },
  });
  return user;
};

module.exports = {
  create,
  findByEmail,
};
