import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerQuality } from '../interfaces/power.interface';
import PowerQualityEditor from './power-quality-editor';
import useTrigger from '../hooks/useTrigger';

interface AddPowerQualityModalProps {
  initialData?: IPowerQuality,
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
          <Modal.Title>Edit Power Quality</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PowerQualityEditor initialData={props.initialData} onChange={setResult} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClose()}>Cancel</Button>
          <Button variant="secondary" className='btn--delete' onClick={() => props.onClose()}>Delete</Button>
          <Button variant="primary" className='btn--primary' onClick={() => {onSave()}}>Save</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );

};

export default AddPowerQualityModal;
