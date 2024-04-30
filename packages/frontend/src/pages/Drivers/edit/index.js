import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './components/form';
import { Message } from 'rsuite';
import Loading from '@ui/loader';
import { useHeaderTitleLinks } from '@ui/breadcrumbs';
import { getBreadCrums } from '../helper';
import { useGetUserQuery } from '@redux/api/account-api';

const EditUser = () => {
  const { id } = useParams();

  const { data: user, isLoading: loading } = useGetUserQuery({ id }, { skip: !id });

  const title = id ? 'Редактировать пользователя' : 'Создать нового пользователя';
  useHeaderTitleLinks(getBreadCrums(id));

  return (
    <>
      <div>
        <h5>{title}</h5>
      </div>
      {id ? null : (
        <Message
          className="mt-20"
          closable
          showIcon
          type="info"
          description={
            <p>
              Обязательные поля выделены звёздочкой <span className="red-color fw-bolder">*</span>
            </p>
          }
        />
      )}
      {id && loading ? <Loading /> : <UserForm user={user} />}
    </>
  );
};

export default EditUser;
