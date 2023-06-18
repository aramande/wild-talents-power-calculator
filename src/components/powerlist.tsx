import React, { useState } from 'react';
import { IPowerRegistry, Power, PowerListActionKind, PowerListActions } from '../hooks/usePowerList';
import { IPowerQuality } from '../interfaces/power.interface';
import { createAction } from '../helpers/Reducer';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../modals/confirm.modal';
import QualityHelper from '../helpers/Quality.helper';
import TextboxModal from '../modals/textbox.modal';

interface PowerListProps {
  savedPowers: IPowerRegistry;
  dispatchPower: React.Dispatch<PowerListActions>;
  setPower: (name: string, qualities: Power) => void;
}

const PowerList: React.FC<PowerListProps> = (props) => {
  
  const [openConfirmRemove, setOpenConfirmRemove] = useState<boolean>(false);
  const [openExport, setOpenExport] = useState<string|undefined>(undefined);
  const [openImport, setOpenImport] = useState<boolean>(false);
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
  function exportSelected(): void{
    const toExport: Record<string, string> = {}; 
    for (const name of Object.keys(props.savedPowers)) {
      const power = props.savedPowers[name].qualities ? props.savedPowers[name] : new Power(props.savedPowers[name] as any) ;
      if(selectedPower.indexOf(name) >= 0){
        toExport[name] = power.toString();
      }
    }
    setOpenExport(JSON.stringify(toExport));
  }
  function importJSON(content: string): void{
    try{
      const toImport = JSON.parse(content);
      for (const name of Object.keys(toImport)) {
        const power = Power.fromString(toImport[name]);
        console.log('power', power);
        props.dispatchPower(createAction(PowerListActionKind.UPDATE_POWER_OBJ, {name: name, power: power }))
      }
    }
    catch(error){
      console.error('Parse Error', error);
    }
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
      {Object.entries(props.savedPowers).map(([name, power]) => {
        if(power.qualities === undefined) power = new Power(power as any); //Support for old style powers
        const cost = calculateTotalCost(power.qualities);
        return (
        <div className='app__poweritem' key={name} >
          <input type='checkbox' value={name} checked={selectedPower.indexOf(name) >= 0} onChange={() => selectPower(name)} />
          <span onClick={() => props.setPower(name, power)}><strong>{name}</strong> ({cost}/{cost*2}/{cost*4})</span>
        </div>
      )})}
      <div className='app__powerlist-control'>
        <Button className='btn--neutral' onClick={() => exportSelected()}><i className='fa-solid fa-download'></i> Export</Button>
        <Button className='btn--neutral' onClick={() => setOpenImport(true)} ><i className='fa-solid fa-upload'></i> Import</Button>
        <button className='btn btn--delete' onClick={() => removeSelected()}><i className='fa-solid fa-trash'></i> Delete</button>
      </div>
      
      <ConfirmModal show={openConfirmRemove} onConfirm={() => confirmRemovePower()} confirmButton='Delete'
          message={'Are you sure you want to remove all selected powers'} 
          onCancel={() => setOpenConfirmRemove(false)} header='Deleting power' />
      <TextboxModal show={openExport !== undefined} editable={false} 
          content={openExport ?? ''} 
          cancelButton={'Close'}
          onCancel={() => setOpenExport(undefined)} header='Export JSON' />
      <TextboxModal show={openImport} editable={true} content={''}
          confirmButton={'Import'}
          onConfirm={(content) => {importJSON(content); setOpenImport(false)}}
          cancelButton={'Close'}
          onCancel={() => setOpenImport(false)} header='Import JSON' />
    </>
  );
};

export default PowerList;
