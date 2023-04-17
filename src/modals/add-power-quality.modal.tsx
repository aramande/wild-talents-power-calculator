import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerQuality } from '../interfaces/power.interface';

interface AddPowerQualityModalProps {
  show: boolean,
  onClose: () => void
  onSave: (result: IPowerQuality) => void
}

const AddPowerQualityModal: React.FC<AddPowerQualityModalProps> = (props) => {
  const result: IPowerQuality = {
    ref: 0,
    multiplier: 1,
    cost: 0
  };
  return (
    <Modal
      show={props.show}
      onHide={() => props.onClose()}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add new Power Quality</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClose()}>Cancel</Button>
          <Button variant="primary" className='btn--primary' onClick={() => {props.onSave(result); props.onClose()}}>Create</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default AddPowerQualityModal;
