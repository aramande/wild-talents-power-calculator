import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import PowerQualityEditor from './power-quality-editor';

interface AddPowerQualityModalProps {
  show: boolean,
  onClose: () => void
  onSave: (result: IPowerQuality) => void
}

const AddPowerQualityModal: React.FC<AddPowerQualityModalProps> = (props) => {

  const [result, setResult] = useState<IPowerQuality>(undefined as any as IPowerQuality);

  function onSave(){
    if(result) props.onSave(result); 
    props.onClose();
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.onClose()}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add new Power Quality</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PowerQualityEditor onChange={setResult} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClose()}>Cancel</Button>
          <Button variant="primary" className='btn--primary' onClick={() => {onSave()}}>Create</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );

};

export default AddPowerQualityModal;
