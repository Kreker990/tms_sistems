import React, { useState } from 'react';
import { Form, Button, Modal } from 'rsuite';
import { useDispatch } from 'react-redux';
import TextField from '../../../components/TextField';
import { addCompanyA, updateCompanyA } from '../../../redux/action/companiesA';
import SearchMap from '../../../components/SearchMap/SearchMap';

const AddEdit = ({ open, handleClose, data }) => {
  const initialData = {
    name: '',
    email: '',
    type: '',
    address: '',
    contact: '',
    ...data,
  };

  const [formValue, setFormValue] = useState(initialData);

  const handleChange = (value, name) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (data?.id) dispatch(updateCompanyA({ companyId: data.id, updateData: formValue }))
    else { dispatch(addCompanyA(formValue)) }
    handleClose();
  };

  return (
    <>
      <h3>{data ? `Редактировать точку : ${data.name}` : 'Добавить новую точкy'}</h3>
      <Form onSubmit={handleSubmit} fluid onChange={setFormValue} formValue={formValue}>
        <TextField required name="name" label="Название точки отправки" />
        <TextField required type="email" name="email" label="Email" />
        <TextField required type="contact" name="contact" label="Контакты" placeholder={formValue?.contact ?? "(555) 333-777}"} mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} onChange={(value) => handleChange(value, "contact")} />
        <TextField required name="type" label="Тип точки отправки" placeholder='Тип' />
        <TextField required name="address" label="Адрес" placeholder='Укажите полный адрес точки отправки' />
        <div style={{ position: 'relative', zIndex: 100 }}>
          <SearchMap setLocation={(location) => setFormValue(prev => ({ ...prev, address: location }))} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end', margin: '20px' }}>
          <Button type='submit' appearance="primary">
            {data?.id ? 'Изменить' : "Добавить"}
          </Button>
          <Button type='button' onClick={handleClose} appearance="default">
            Отмена
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddEdit;