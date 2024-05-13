import React, { useState } from 'react';
import { Form, Button, Modal, SelectPicker, InputGroup, Input } from 'rsuite';
import { useDispatch } from 'react-redux';
import TextField from '../../../components/TextField';
import { addStaff, updateStaff } from '../../../redux/action/staff';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

const AddEdit = ({ open, handleClose, data }) => {
  const initialData = {
    name: '',
    mail: '',
    contact: '',
    role: '',
    ...data,
    password: '',
  };
  const [formValue, setFormValue] = useState(initialData);
  const [visible, setVisible] = useState(false);
  const handleChange = (value, name) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    console.log(formValue);
    
    if (data?.id) dispatch(updateStaff({ staffId: data.id, updateData: formValue }))
    else { dispatch(addStaff(formValue)) }
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
            <TextField required name="contact" value={formValue.contact} label="Номер телефона" placeholder={data?.contact ?? "(555) 333-7777"} mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} onChange={(value) => handleChange(value, "contact")} />
            <SelectPicker 
              data={[
                { label: 'Админ', value: 'admin' },
                { label: 'Менеджер', value: 'manager' }
              ]}
              value={formValue.role}
              onChange={(value) => handleChange(value, 'role')}
              placeholder="Выберите роль"
              block
              required
              searchable={false}
              style={{ marginBottom: 20 }}
            />
            <TextField placeholder="example@gmail.com" required type="email" name="mail" label="Email" />
            <InputGroup inside style={{marginBottom: '20px'}}>
              <Input onChange={(value) => handleChange(value, 'password')} name='password' required type={visible ? 'text' : 'password'} />
              <InputGroup.Button onClick={()=>setVisible(!visible)}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
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
