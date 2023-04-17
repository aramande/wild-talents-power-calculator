import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerQuality, TCapacity } from '../interfaces/power.interface';

interface AddPowerQualityModalProps {
  show: boolean,
  onClose: () => void
  onSave: (result: IPowerQuality) => void
}

const AddPowerQualityModal: React.FC<AddPowerQualityModalProps> = (props) => {
  const [quality, setQuality] = useState('Attack');
  const [capacity, setCapacity] = useState<TCapacity>('Mass');
  const result: IPowerQuality = {
    ref: 0,
    multiplier: 1,
    cost: 1,
    name: quality,
    capacities: [capacity]
  };

  function updateQuality(quality: string){
    if(isUnavailable(quality, capacity)){
      if(quality == 'Attack') setCapacity('Mass');
      if(quality == 'Defend') setCapacity('Self');
      if(quality == 'Useful') setCapacity('Mass');
    }
    setQuality(quality);
  }
  function isActive(value: string, expected: string) {
    return value == expected ? 'btn--primary ' : '';
  }
  function isUnavailable(quality: string, capacity: string) {
    let disabled = false;
    switch(quality){
      case 'Attack':
        if(capacity != 'Mass' && capacity != 'Range') disabled = true;
        break;
      case 'Defend':
        if(capacity != 'Self') disabled = true;
        break;
      case 'Useful':
        if(capacity != 'Mass' && capacity != 'Range' && capacity != 'Speed') disabled = true;
        break;
    }
    return disabled ? 'btn--disabled ' : '';
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
          <div className="btn-group" role="group" aria-label="Power Quality">
            <Button type="button" className={isActive(quality, 'Active') + 'btn'} onClick={() => updateQuality('Attack')}>Attack</Button>
            <Button type="button" className={isActive(quality, 'Defend') + 'btn'} onClick={() => updateQuality('Defend')}>Defend</Button>
            <Button type="button" className={isActive(quality, 'Useful') + 'btn'} onClick={() => updateQuality('Useful')}>Useful</Button>
          </div>
          <div className="btn-group" role="group" aria-label="Power Capacity">
            <Button type="button" className={isActive(capacity, 'Mass') + isUnavailable(quality, 'Mass') + 'btn'} onClick={() =>  setCapacity('Mass')}>Mass</Button>
            <Button type="button" className={isActive(capacity, 'Range') + isUnavailable(quality, 'Range') + 'btn'} onClick={() => setCapacity('Range')}>Range</Button>
            <Button type="button" className={isActive(capacity, 'Speed') + isUnavailable(quality, 'Speed') + 'btn'} onClick={() => setCapacity('Speed')}>Speed</Button>
            <Button type="button" className={isActive(capacity, 'Self') + isUnavailable(quality, 'Self') + 'btn'} onClick={() => setCapacity('Self')}>Self</Button>
          </div>
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
