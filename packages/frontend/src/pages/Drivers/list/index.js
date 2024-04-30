import React from 'react';
import UserList from './components/list';
import { useHeaderTitleLinks } from '@ui/breadcrumbs';
import AdminFilters from '@components/filters/admin';

const Admin = () => {
  useHeaderTitleLinks([{ to: '/admin/users', title: 'Пользователи' }]);
  return (
    <>
      <AdminFilters
        title="Пользователи"
        link="/admin/users/new"
        selectors={['contractorId', 'departmentId']}
        placeholder="Поиск по фамилии и email"
      />
      <UserList />
    </>
  );
};

export default Admin;
