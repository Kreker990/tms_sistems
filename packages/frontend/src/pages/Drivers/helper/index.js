import { USER_STATUS } from '@shared/constants';
import structuredClone from '@ungap/structured-clone';

export function processForBackend(data) {
  const obj = structuredClone(data);

  if (data.id) {
    obj.resources = obj.resources?.length > 0 ? obj.resources : [];
  }

  if (obj.contractor) {
    obj.contractorId = obj.contractor.id;
  }
  if (obj.role) {
    obj.roleId = obj.role.id;
  }
  if (obj.status) {
    obj.status = obj.status.id;
  }
  obj.phoneNumber = obj.phoneNumber
    ? obj.phoneNumber.includes('+996')
      ? obj.phoneNumber.replace(/\s+/g, '')
      : '+996' + obj.phoneNumber
    : null;
  obj.permissions = obj.permissions.length === 0 ? [] : obj.permissions.map((item) => item.id);
  delete obj.contractor;
  delete obj.role;
  delete obj.confirm;
  return obj;
}

export function processForFront(data) {
  const obj = structuredClone(data);
  obj.phoneNumber = obj.phoneNumber ? obj.phoneNumber.substring(4, 13) : null;
  obj.status = USER_STATUS.filter((item) => item.id === obj.status)[0];
  return obj;
}

export const initialValues = {
  permissions: [],
};

export const validate = (values, isEdit) => {
  let errors = {};
  if (
    values.phoneNumber &&
    (values.phoneNumber.replace(/\s+/g, '').length < 9 ||
      values.phoneNumber.replace(/\s+/g, '').includes('*'))
  ) {
    errors.phoneNumber = 'Введите номер полностью';
  }
  if (!values.lastName) {
    errors.lastName = 'обязательно';
  }
  if (!values.email) {
    errors.email = 'обязательно';
  }
  if (!values.contractor) {
    errors.contractor = 'обязательно';
  }
  if (!values.role) {
    errors.role = 'обязательно';
  }
  if (isEdit) {
    if (values.password && values.confirm !== values.password) {
      errors.confirm = 'пароли не совпадают';
    }
  } else {
    if (!values.password) {
      errors.password = 'обязательно';
    }
    if (!values.confirm) {
      errors.confirm = 'обязательно';
    } else if (values.confirm !== values.password) {
      errors.confirm = 'пароли не совпадают';
    }
  }
  if (!values.status) {
    errors.status = 'обязательно';
  }
  if (!values.permissions || values.permissions.length === 0) {
    errors.permissions = 'обязательно';
  }

  return errors;
};

export const getBreadCrums = (id) => {
  return [
    { to: '/admin/users', title: 'Пользователи' },
    id
      ? { to: `/admin/users/edit/${id}`, title: `Редактировать пользователя` }
      : { to: `/admin/users/new`, title: `Новый пользователь` },
  ];
};
