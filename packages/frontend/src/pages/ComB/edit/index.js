import React, { useState } from 'react';
import { Form, Button, Modal } from 'rsuite';
import { useDispatch } from 'react-redux';
import TextField from '../../../components/TextField';
import { addCompanyB, updateCompanyB } from '../../../redux/action/companiesB';

const AddEdit = ({ open, handleClose, data }) => {
  const initialData = {
    name: '',
    email: '',
    type: '',
    address: '',
    ...data,
  };

  const [formValue, setFormValue] = useState(initialData);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (data?.id) dispatch(updateCompanyB({ companyId: data.id, updateData: formValue }))
    else { dispatch(addCompanyB(formValue)) }
    handleClose();
  };

  return (
    <>
      <Modal className="companyEditModal" open={open} onClose={handleClose} size="sm">
        <Modal.Header>
          <Modal.Title>{data ? `Редактировать точку доставки: ${data.name}` : 'Добавить новую точку доставки'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} fluid onChange={setFormValue} formValue={formValue}>
          <Modal.Body className='px-[4px]'>
            <TextField required name="name" label="Название точки доставки" />
            <TextField required type="email" name="email" label="Email" />
            <TextField required name="type" label="Тип точки доставки" placeholder='Тип' />
            <TextField required name="address" label="Адрес" placeholder='Укажите полный адрес точки доставки' />

          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' appearance="primary">
              {data?.id ? 'Изменить' : "Добавить"}
            </Button>
            <Button type='button' onClick={handleClose} appearance="default">
              Отмена
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddEdit;