const { CompaniesB } = require('./models');

const createCompanyB = async ({
  name,
  email,
  type,
  address,
}) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const company = await CompaniesB.create({
      name,
      email,
      type,
      address,
    });
    return company;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const findAllCompaniesB = async () => {
  const data = await CompaniesB.findAll();
  return data;
};

const updateCompanyB = async (id, data) => {
  try {
    const company = await CompaniesB.findByPk(id);
    if (!company) {
      return null;  
    }
    const updatedCompany = await company.update(data);
    return updatedCompany; 
  } catch (error) {
    console.error('Ошибка при обновлении данных точки доставки:', error);
    return null;
  }
};

const deleteCompanyB = async (id) => CompaniesB.destroy({ where: { id } });

module.exports = {
  createCompanyB,
  findAllCompaniesB,
  updateCompanyB,
  deleteCompanyB,
};
