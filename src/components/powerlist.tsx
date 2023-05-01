import React, { useState } from 'react';
import { IPowerRegistry, PowerListActionKind, PowerListActions } from '../hooks/usePowerList';
import { IPowerQuality } from '../interfaces/power.interface';
import { createAction } from '../helpers/Reducer';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../modals/confirm.modal';
import QualityHelper from '../helpers/Quality.helper';

interface PowerListProps {
  savedPowers: IPowerRegistry;
  dispatchPower: React.Dispatch<PowerListActions>;
  setPower: (name: string, qualities: IPowerQuality[]) => void;
}

const PowerList: React.FC<PowerListProps> = (props) => {
  
  const [openConfirmRemove, setOpenConfirmRemove] = useState<boolean>(false);
  const [selectedPower, setSelectedPower] = useState<string[]>([]);
  
  function calculateTotalCost(qualities: IPowerQuality[]): number{
    const totalCost = qualities.reduce((total: number, item: IPowerQuality) => total + QualityHelper.calculateCost(item), 0);
    return totalCost;
  }
  
  function selectPower(name: string){
    setSelectedPower(prev => {
      if(prev.indexOf(name) >= 0) return prev.filter(x => x !== name);
      return [...prev, name];
    });
  }
  function removeSelected(): void{
    setOpenConfirmRemove(true);
  }

  function confirmRemovePower(): void{
    for (const power of selectedPower) {
      props.dispatchPower(createAction(PowerListActionKind.DEL_POWER, power));
    }
    setSelectedPower([]);
    setOpenConfirmRemove(false);
  }

  return (
    <>
    {Object.entries(props.savedPowers).map(([name, qualities], index) => {
      const cost = calculateTotalCost(qualities);
      return (
      <div className='app__poweritem' key={name} >
        <input type='checkbox' value={name} checked={selectedPower.indexOf(name) >= 0} onChange={() => selectPower(name)} />
        <span onClick={() => props.setPower(name, qualities)}><strong>{name}</strong> ({cost}/{cost*2}/{cost*4})</span>
      </div>
    )})}
    <div className='app__powerlist-control'>
      <Button className='btn--neutral' ><i className='fa-solid fa-download'></i> Export</Button>
      <Button className='btn--neutral' ><i className='fa-solid fa-upload'></i> Import</Button>
      <button className='btn btn--delete' onClick={() => removeSelected()}><i className='fa-solid fa-trash'></i> Delete</button>
    </div>
    
    <ConfirmModal show={openConfirmRemove} onConfirm={() => confirmRemovePower()} confirmButton='Delete'
        message={'Are you sure you want to remove all selected powers'} 
        onCancel={() => setOpenConfirmRemove(false)} header='Deleting power'  />
    </>
  );
};

export default PowerList;
