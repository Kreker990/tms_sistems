import React, { useState } from 'react';
import { Form, Button, Modal } from 'rsuite';
import { useDispatch } from 'react-redux';
import TextField from '../../../components/TextField';
import { addStatusOrder, updateStatusOrder } from '../../../redux/action/statusOrders';

const AddEdit = ({ open, handleClose, data }) => {
  const initialData = {
    key: '',
    value: '',
  };

  const [formValue, setFormValue] = useState(initialData);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (data?.id) dispatch(updateStatusOrder({ id: data.id, updateData: formValue }))
    else { dispatch(addStatusOrder(formValue)) }
    handleClose();
  };

  return (
    <>
      <Modal className="companyEditModal" open={open} onClose={handleClose} size="sm">
        <Modal.Header>
          <Modal.Title>{data ? `Редактировать статус заказа: ${data.name}` : 'Добавить новый статус заказа'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} fluid onChange={setFormValue} formValue={formValue}>
          <Modal.Body className='px-[4px]'>
            <TextField required name="key" label="Ключ статуса заказа" />
            <TextField required name="value" label="Ключ статуса заказа" />

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