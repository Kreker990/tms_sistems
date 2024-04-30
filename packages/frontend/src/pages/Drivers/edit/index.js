import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Modal, SelectPicker } from 'rsuite';
import { addDriver, getDriver } from '../../../redux/action/getDriver';
import { useDispatch, useSelector } from 'react-redux';

const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
  label: item,
  value: item
}));

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AddEdit = ({open, handleClose, data}) => {
  const [formValue, setFormValue] = useState(data?.id ? data : null);
  const dispatch = useDispatch();
const handleSubmit = async () => {
  dispatch(addDriver(formValue));
    handleClose();  
  };
  
  return (
    <>
      <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>New Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId="name-9">
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name="name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email-9">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="mail" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password-9">
              <Form.ControlLabel>carNumber</Form.ControlLabel>
              <Form.Control name="carNumber" autoComplete="off" type='number' />
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel>Contact</Form.ControlLabel>
              <Form.Control rows={5} name="contact"  type='number' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Создать
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEdit;