/** Админ список пользователей */
import React, { useEffect } from 'react';
import { Pagination } from '@ui/pagination';
import { getCurLimit, getCurPage } from '@shared/funcs';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { toast } from 'react-hot-toast';
import Loading from '@ui/loader';
import { useDeleteUserMutation, useGetUsersQuery } from '@redux/api/account-api';
import { DelMod } from '@components/admin/del-mod';

function UserList() {
  const location = useLocation();
  const { filter, contractorId, departmentId } = qs.parse(location.search.split('?')[1]);
  const { isLoading, data } = useGetUsersQuery({
    curPage: getCurPage(),
    limit: getCurLimit(),
    filter,
    contractorId,
    departmentId,
  });
  const [
    deleteUser,
    { isError: isDeleteError, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteUserMutation();

  const handleDelete = (id) => {
    if (id) {
      deleteUser({ id });
    }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(`Пользователь удален`);
    }
    if (isDeleteError) {
      toast.error(`Ошибка удаления ${deleteError?.response?.status}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteError, isDeleteSuccess]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="contractor-dep-table w100">
          <thead>
            <tr>
              <th style={{ width: 70 }}>№</th>
              <th style={{ width: 132 }}>Фамилия</th>
              <th style={{ width: 132 }}>Имя</th>
              <th style={{ width: 150 }}>Email</th>
              <th style={{ width: 110 }}>Контрагент</th>
              <th style={{ width: 110 }}>Тип контрагента</th>
              <th style={{ width: 98 }}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {data?.result.map((item) => (
              <tr
                style={{ color: item.locked && '#fa8682', fontWeight: item.locked && 700 }}
                key={item.id}
              >
                <td>{item.id}</td>
                <td>{item.lastName}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.contractor ? item.contractor.name : '----'}</td>
                <td>{item.contractor ? item.contractor.type : '---'}</td>
                <td>
                  <span>
                    <DelMod
                      id={item.id}
                      name={item.lastName}
                      handleDelete={handleDelete}
                      editUrl={`/admin/users/edit/${item.id}`}
                      message="пользователя"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination total={data?.totalCount} />
    </>
  );
}

export default UserList;
