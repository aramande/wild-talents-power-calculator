import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerQuality } from '../interfaces/power.interface';
import PowerQualityEditor from '../components/PowerQualityEditor/powerqualityeditor';
import ConfirmModal from './confirm.modal';
import useModal from '../hooks/useModal';

interface AddPowerQualityModalProps {
  initialData?: IPowerQuality;
  show: boolean;
  onClose: () => void;
  onSave: (result: IPowerQuality) => void;
  onDelete: (ref: string) => void;
}

const AddPowerQualityModal: React.FC<AddPowerQualityModalProps> = (props) => {
  const [result, setResult] = useState<IPowerQuality>(undefined as any as IPowerQuality);
  const [removeModalOpen, toggleRemoveModal ] = useModal();

  function onSave() {
    if (result) props.onSave(result);
    props.onClose();
  }
  function onDelete() {
    toggleRemoveModal(true);
  }
  function removeModifier(): void {
    if (result) props.onDelete(result.ref);
    props.onClose();
    toggleRemoveModal(false);
  }

  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit Power Quality</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PowerQualityEditor initialData={props.initialData} onChange={setResult} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClose()}>
            Cancel
          </Button>
          <Button variant="secondary" className="btn--delete" onClick={() => onDelete()}>
            Delete
          </Button>
          <Button variant="primary" className="btn--primary" onClick={() => onSave()}>
            Save
          </Button>
          
          {result && (<ConfirmModal width={'300px'} show={removeModalOpen} header={'Unsaved Changes'} message={[`Are you sure you want to remove '${result.name} (${result.specific})'?`]} 
            onCancel={() => toggleRemoveModal(false)} 
            onConfirm={() => removeModifier()} />)}
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default AddPowerQualityModal;
