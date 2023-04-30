import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ConfirmModalProps {
  header: string;
  message: string;
  show: boolean;
  cancelButton?: string;
  denyButton?: string;
  confirmButton?: string;
  onCancel: () => void;
  onDeny?: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const confirmButton = props.confirmButton ?? 'Yes';
  const denyButton = props.denyButton ?? 'No';
  const cancelButton = props.cancelButton ?? 'Cancel';
  function onCancel(){
    props.onCancel();
  }
  function onDeny(){
    if(props.onDeny) props.onDeny();
  }
  function onConfirm(){
    props.onConfirm();
  }
  return (
    <Modal
      show={props.show}
      onHide={() => onCancel()}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.message}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onCancel()}>{cancelButton}</Button>
          { props.onDeny && <Button variant="secondary" onClick={() => onDeny()}>{denyButton}</Button> }
          <Button variant="primary" className='btn--primary' onClick={() => {onConfirm()}}>{confirmButton}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ConfirmModal;
