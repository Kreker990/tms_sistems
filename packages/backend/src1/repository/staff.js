require('./models');
const { Staff, Orders, StatusOrder, CompaniesA, Drivers } = require('./models');

const create = async (
  {
    name,
    mail,
    contact,
    hashedPassword,
    role,
    salt
  },
) => {
  try {
    const user = await Staff.create({
      name,
      mail,
      contact,
      hashedPassword,
      role,
      salt,
    });
    return user;
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
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
  const data = await Staff.findAll({
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
          attributes: ['id', 'name', 'contact'],
          as: 'driver',
        },
        {
          model: Staff,
          attributes: ['id', 'name', 'contact'],
          as: 'staff'
        }
      ]
    },
  });
  return data;
};

const update = async (id, data) => {
  try {
    const user = await Staff.findByPk(id);
    if (!user) {
      return null;
    }
    const updatedUser = await user.update(data);
    return updatedUser;
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return null;
  }
};

const delet = async (id) => Staff.destroy({ where: { id } });

module.exports = {
  create,
  findByEmail,
  findAllData,
  update,
  delet
};
