import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerItem, IPowerQuality, TCapacity } from '../interfaces/power.interface';

interface AddPowerQualityModalProps {
  show: boolean,
  onClose: () => void
  onSave: (result: IPowerQuality) => void
}

const AddPowerQualityModal: React.FC<AddPowerQualityModalProps> = (props) => {
  const [quality, setQuality] = useState('Attack');
  const [capacity, setCapacity] = useState<TCapacity>('Mass');
  const [addedModifiers, setAddedModifiers] = useState<IPowerItem[]>([]);
  const result: IPowerQuality = {
    ref: 0,
    multiplier: 0,
    cost: 1,
    name: quality,
    capacities: [capacity],
    modifiers: addedModifiers
  };

  function updateQuality(quality: string){
    if(isUnavailable(quality, capacity)){
      if(quality == 'Attack') setCapacity('Mass');
      if(quality == 'Defend') setCapacity('Self');
      if(quality == 'Useful') setCapacity('Mass');
    }
    setQuality(quality);
  }
  function addModifier(formData: FormData){
    setAddedModifiers((mods) => {
      const max = mods.reduce((prev, current) => (prev > current.ref) ? prev : current.ref, 0);
      
      return [...mods, {
        ref: max + 1,
        name: formData.get('name')?.toString(),
        specific: formData.get('specific')?.toString(),
        cost: parseInt(formData.get('cost')?.toString() ?? '0'),
        multiplier: 1
      }];
    });
  }
  function sortModifiers(a: IPowerItem, b: IPowerItem): number {
    const aCost = a.cost > 0 ? a.cost + 10 : -a.cost;
    const bCost = b.cost > 0 ? b.cost + 10 : -b.cost; 
    return bCost - aCost;
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
            <Button type="button" className={isActive(quality, 'Attack') + 'btn'} onClick={() => updateQuality('Attack')}>Attack</Button>
            <Button type="button" className={isActive(quality, 'Defend') + 'btn'} onClick={() => updateQuality('Defend')}>Defend</Button>
            <Button type="button" className={isActive(quality, 'Useful') + 'btn'} onClick={() => updateQuality('Useful')}>Useful</Button>
          </div>
          <div className="btn-group" role="group" aria-label="Power Capacity">
            <Button type="button" className={isActive(capacity, 'Mass') + isUnavailable(quality, 'Mass') + 'btn'} onClick={() =>  setCapacity('Mass')}>Mass</Button>
            <Button type="button" className={isActive(capacity, 'Range') + isUnavailable(quality, 'Range') + 'btn'} onClick={() => setCapacity('Range')}>Range</Button>
            <Button type="button" className={isActive(capacity, 'Speed') + isUnavailable(quality, 'Speed') + 'btn'} onClick={() => setCapacity('Speed')}>Speed</Button>
            <Button type="button" className={isActive(capacity, 'Self') + isUnavailable(quality, 'Self') + 'btn'} onClick={() => setCapacity('Self')}>Self</Button>
          </div>

          <form onSubmit={(e) => { addModifier(new FormData(e.currentTarget)); e.preventDefault() }}>
            <table className='form'>
              <tbody>
                <tr><td colSpan={2}><h3 className='form__header'>Extras/Flaws</h3></td></tr>
                <tr>
                  <th className='form__label'>Name</th>
                  <td className='form__value'><input type="text" name='name' /></td>
                </tr>
                <tr>
                  <th className='form__label'>Note</th>
                  <td className='form__value'><input type="text" name='specific' /></td>
                </tr>
                <tr>
                  <th className='form__label'>Cost</th>
                  <td className='form__value'><input type="number" name='cost' /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button className='btn btn--accent btn--small' type='submit'>Add</button></td>
                </tr>
              </tbody>
            </table>
          </form>

          <div className='spaceabove--2'>
            {addedModifiers.sort(sortModifiers).map(modifier => (
              <div key={modifier.ref} className='flex flex--gap1 relative'>
                <strong>{modifier.multiplier > 1 ? `+${modifier.multiplier} ` : ''}{modifier.name}</strong>
                {modifier.specific && (<span>({modifier.specific})</span>)}
                <small>{`(${modifier.cost * modifier.multiplier})`}</small>
                <button className='btn btn--transparent btn--small absolute top--0 right--0'><i className="fa-solid fa-trash"></i></button>
              </div>
            ))}
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