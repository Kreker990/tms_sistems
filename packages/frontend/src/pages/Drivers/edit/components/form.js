import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { Row, Col } from 'rsuite';
import { SelectAdapter, InputAdapter, PhoneAdapter } from '@components/adapters';
import history from '@shared/history';
import { toast } from 'react-hot-toast';
import { errorToast } from '@shared/error-toast';
import { SearchContractorField } from '@components/search/contractor';
import {
  useAddUserMutation,
  useUpdateUserMutation,
  useGetRolesQuery,
  useGetPermissionsQuery,
} from '@redux/api/account-api';
import { permissionsSearch } from '@api/account';
import { initialValues, processForBackend, validate } from '../../helper';
import { BottomToolbar } from '@components/admin/bottom-toolbar';
import { AppIconBtn } from '@ui/buttons/app-btn';
import { generatePassword } from '@shared/funcs';
import { USER_STATUS } from '@shared/constants';

function UserForm({ user }) {
  const [addUser, { isSuccess: isAddUserSuccess, error: addUserError }] = useAddUserMutation();
  const [
    updateUser,
    { isSuccess: isUpdateUserSuccess, error: updateUserError },
  ] = useUpdateUserMutation();
  const { data: permissions } = useGetPermissionsQuery();
  const { data: roles } = useGetRolesQuery();

  const onSubmit = (values) => {
    const data = processForBackend(values);
    if (data.id) {
      if (!data.password) {
        // пароль пуст, то удаляем
        delete data.password;
      }
      updateUser({ id: values?.id, data });
    } else {
      addUser(data);
    }
  };

  useEffect(() => {
    if (isAddUserSuccess) {
      toast.success('Вы успешно создали нового пользователя');
      history.goBack();
    } else if (addUserError) {
      errorToast(addUserError);
    }

    if (isUpdateUserSuccess) {
      toast.success('Вы успешно изменили данные пользователя');
      history.goBack();
    } else if (updateUserError) {
      errorToast(updateUserError);
    }
  }, [isAddUserSuccess, addUserError, isUpdateUserSuccess, updateUserError]);

  return (
    <Form
      validate={(values) => validate(values, !!user)}
      onSubmit={(values) => onSubmit(values)}
      initialValues={user || initialValues}
      mutators={{
        setPassword: ([value], state, { changeValue }) => {
          changeValue(state, 'password', () => value);
          changeValue(state, 'confirm', () => value);
        },
      }}
    >
      {({ handleSubmit, submitting, form, values }) => (
        <form
          onSubmit={handleSubmit}
          className="rs-form rs-form-vertical rs-form-fixed-width"
          autoComplete="off"
        >
          <Row className="mt-20">
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="firstName"
                component={InputAdapter}
                label="Имя"
                placeholder="Введите Имя"
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="lastName"
                component={InputAdapter}
                label="Фамилия"
                placeholder="Введите Имя"
                required
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="email"
                type="text"
                component={InputAdapter}
                label="Email"
                placeholder="Введите email"
                required
                disabled={values.id}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="inn"
                type="text"
                component={InputAdapter}
                label="ИНН"
                placeholder="Введите ИНН"
              />
            </Col>
          </Row>
          <Row className="mt-20">
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field name="phoneNumber" component={PhoneAdapter} label="Телефон" />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="status"
                label="Статус"
                component={SelectAdapter}
                options={USER_STATUS}
                required
              />
            </Col>
          </Row>
          <hr />
          <Row className="mt-20">
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="password"
                component={InputAdapter}
                label="Пароль"
                placeholder="Введите пароль"
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="confirm"
                component={InputAdapter}
                label="Повторите пароль"
                placeholder="Введите пароль"
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <br />
              <AppIconBtn
                onClick={() => {
                  let pass = generatePassword();
                  form.mutators.setPassword(pass);
                }}
                icon="keychain"
                title="Сгенерировать пароль"
              />
            </Col>
          </Row>
          <hr />
          <Row className="mt-20">
            <Col xs={24} sm={24} md={8} lg={6}>
              <SearchContractorField name="contractor" label="Контрагент" required />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field name="role" label="Роль" component={SelectAdapter} options={roles} required />
              <OnChange name="role">
                {async (o) => {
                  if (o) {
                    const { data } = await permissionsSearch({ roleId: o.id });
                    form.change('permissions', data);
                  } else if (!o) {
                    // clear perms
                    form.change('permissions', []);
                  }
                }}
              </OnChange>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Field
                name="permissions"
                label="Права"
                component={SelectAdapter}
                value={values ? values.permissions : []}
                options={permissions}
                getOptionLabel={(o) => {
                  return o.title;
                }}
                isMulti
                required
                isDisabled={!values.role}
              />
            </Col>
          </Row>
          <Row className="mt-20">
            <Col xs={24} sm={24} md={24} lg={24} className="d-flex jc-flex-end">
              <BottomToolbar disabled={submitting} />
            </Col>
          </Row>
        </form>
      )}
    </Form>
  );
}

UserForm.propTypes = {
  user: PropTypes.object,
};
UserForm.defaultProps = {
  user: undefined,
};

export default UserForm;
