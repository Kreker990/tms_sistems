// components/orders/AddEditOrder.js
import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, SelectPicker, DatePicker } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../../components/TextField';
import { addOrder, updateOrder } from '../../../redux/action/order';
import { getCompaniesA, getCompaniesB, getDrivers, getStaff } from '../../../redux/action/helpers';

const AddEditOrder = ({ open, handleClose, data }) => {
  const initialData = {
    deliveryPointA: '',
    deliveryPointB: '',
    driverId: '',
    status: '',
    timeStart: data?.timeStart ? new Date(data.timeStart) : null,
    timeEnd: data?.timeEnd ? new Date(data.timeEnd) : null,
    managerId: '',
    comment: '',
    ...data,
  };

  // Константы для статусов заказов
  const statusOrders = [
    { id: 1, name: 'Отправляется' },
    { id: 2, name: 'В процессе' },
    { id: 3, name: 'Завершено' },
    { id: 4, name: 'Отменено' }
  ];

  const [formValue, setFormValue] = useState(initialData);

  const dispatch = useDispatch();

  const companiesA = useSelector(state => state.helpers.companiesA);
  const companiesB = useSelector(state => state.helpers.companiesB);
  const drivers = useSelector(state => state.helpers.drivers);
  const staff = useSelector(state => state.helpers.staff);

  useEffect(() => {
    dispatch(getCompaniesA());
    dispatch(getCompaniesB());
    dispatch(getDrivers());
    dispatch(getStaff());
  }, [dispatch]);

  const handleChange = (value, name) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const updatedData = {
      ...formValue,
      timeStart: formValue.timeStart ? formValue.timeStart.toISOString().split('T')[0] : null,
      timeEnd: formValue.timeEnd ? formValue.timeEnd.toISOString().split('T')[0] : null,
    };
    if (data?.id) {
      dispatch(updateOrder({ orderId: data.id, updateData: updatedData }));
    } else {
      dispatch(addOrder(updatedData));
    }
    handleClose();
  };


  return (
    <>
      <Modal className="orderEditModal" open={open} onClose={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{data ? `Редактировать заказ: ${data.id}` : 'Добавить новый заказ'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} fluid onChange={setFormValue} formValue={formValue}>
          <Modal.Body className='px-[4px]'>
            <SelectPicker 
              data={companiesA.map(item => ({ label: item.name, value: item.id }))}
              value={formValue.deliveryPointA}
              onChange={(value) => handleChange(value, 'deliveryPointA')}
              placeholder="Выберите точку доставки A"
              block
              required
              style={{ marginBottom: 20 }}
            />
            <SelectPicker 
              data={companiesB.map(item => ({ label: item.name, value: item.id }))}
              value={formValue.deliveryPointB}
              onChange={(value) => handleChange(value, 'deliveryPointB')}
              placeholder="Выберите точку доставки B"
              block
              required
              style={{ marginBottom: 20 }}
            />
            <SelectPicker 
              data={drivers.map(item => ({ label: item.name, value: item.id }))}
              value={formValue.driverId}
              onChange={(value) => handleChange(value, 'driverId')}
              placeholder="Выберите водителя"
              block
              required
              style={{ marginBottom: 20 }}
            />
            <SelectPicker 
              data={statusOrders.map(item => ({ label: item.name, value: item.id }))}
              value={formValue.status}
              onChange={(value) => handleChange(value, 'status')}
              placeholder="Выберите статус"
              block
              required
              style={{ marginBottom: 20 }}
            />
            <SelectPicker 
              data={staff.filter(el => el.role !== 'admin').map(item => ({ label: item.name, value: item.id }))}
              value={formValue.managerId}
              onChange={(value) => handleChange(value, 'managerId')}
              placeholder="Выберите менеджера"
              block
              required
              style={{ marginBottom: 20 }}
            />
            <DatePicker 
              name="timeStart" 
              label="Дата начала" 
              value={formValue.timeStart} 
              onChange={(value) => handleChange(value, 'timeStart')}
              oneTap
              block
              required
              style={{ marginBottom: 20 }}
            />
            <DatePicker 
              name="timeEnd" 
              label="Дата окончания" 
              value={formValue.timeEnd} 
              onChange={(value) => handleChange(value, 'timeEnd')}
              oneTap
              block
              required
              style={{ marginBottom: 20 }}
            />
            <TextField 
              name="comment" 
              label="Комментарий" 
              value={formValue.comment} 
              onChange={(value) => handleChange(value, 'comment')} 
            />
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

export default AddEditOrder;
