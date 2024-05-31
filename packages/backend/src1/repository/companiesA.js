const { CompaniesA } = require('./models');

const createCompanyA = async ({
  name,
  email,
  type,
  address,
  contact
}) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const company = await CompaniesA.create({
      name,
      email,
      type,
      address,
      contact
    });
    return company;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const findAllCompaniesA = async () => {
  const data = await CompaniesA.findAll();
  return data;
};

const updateCompanyA = async (id, data) => {
  try {
    const company = await CompaniesA.findByPk(id);
    if (!company) {
      return null;  
    }
    const updatedCompany = await company.update(data);
    return updatedCompany; 
  } catch (error) {
    console.error('Ошибка при обновлении данных точки отправки:', error);
    return null;
  }
};

const deleteCompanyA = async (id) => CompaniesA.destroy({ where: { id } });

module.exports = {
  createCompanyA,
  findAllCompaniesA,
  updateCompanyA,
  deleteCompanyA,
};
