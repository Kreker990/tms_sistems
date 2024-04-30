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

const findAllData = async () => {
  const data = await Staff.findAll();
  return data;
};

const delet = async (id) => Staff.destroy({ where: { id } });

module.exports = {
  create,
  findByEmail,
  findAllData,
  delet
};
