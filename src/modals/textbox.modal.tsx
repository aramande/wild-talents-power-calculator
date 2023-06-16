import React, { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface TextboxModalProps {
  header: string;
  content: string;
  show: boolean;
  editable: boolean;
  cancelButton?: string;
  denyButton?: string;
  confirmButton?: string;
  onCancel: () => void;
  onDeny?: () => void;
  onConfirm?: (content: string) => void;
}

const TextboxModal: React.FC<TextboxModalProps> = (props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
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
    if(props.onConfirm && ref.current) props.onConfirm(ref.current.value);
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
          <textarea ref={ref} id="textbox" name="textbox" readOnly={!props.editable} defaultValue={props.content} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onCancel()}>{cancelButton}</Button>
          { props.onDeny && <Button variant="secondary" onClick={() => onDeny()}>{denyButton}</Button> }
          { props.onConfirm && <Button variant="primary" className='btn--primary' onClick={() => {onConfirm()}}>{confirmButton}</Button>}
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default TextboxModal;
