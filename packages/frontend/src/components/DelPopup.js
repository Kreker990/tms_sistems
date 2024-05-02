import React from "react";
import { Button, Modal} from "rsuite";

function DelPopup({handleDelete, text, handleClose, open}) {
    return (
      <Modal size="xs" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Удаление</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены что хотите удалить {text}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} appearance="primary">
            Да
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DelPopup;
