import React, { useState } from 'react';
import { Form, Button, Modal } from 'rsuite';
import { addDriver, updateDriver } from '../../../redux/action/getDriver';
import { useDispatch } from 'react-redux';
import TextField from '../../../components/TextField';

const AddEdit = ({ open, handleClose, data }) => {
  const initialData = {
    name: '',
    mail: '',
    password: '',
    carNumber: '',
    contact: '',
    busy: false,
    ...data,
  };
  const [formValue, setFormValue] = useState(initialData);

  const handleChange = (value, name) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (data?.id) dispatch(updateDriver({ driverId: data.id, updateData: formValue }))
    else { dispatch(addDriver(formValue)) }
    handleClose();
  };
  return (
    <>
      <Modal className="driverEditModal" open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>{data ? `Редактировать водителя: ${data.name}` : 'Добавить нового водителя'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} fluid onChange={setFormValue} formValue={formValue}>
          <Modal.Body className='px-[4px]'>
            <TextField required name="name" label="ФИО" />
            <TextField required type="email" name="mail" label="Email" />
            <TextField type="password" name="password" label="Пароль" required={data ? false : true} />
            <TextField required name="carNumber" value={formValue.carNumber} label="Номер машины" placeholder='AAA888' mask={[/[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/, /[A-Z0-9]/]} onChange={(value) => handleChange(value, "carNumber")}
            />
            <TextField required name="contact" value={formValue.contact} label="Номрер телефона" placeholder={data?.contact ?? "(555) 333-777}"} mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} onChange={(value) => handleChange(value, "contact")} />
            <div style={{ height: '10px' }}></div>
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