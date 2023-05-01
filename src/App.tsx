import React, { useState } from 'react';
import PowerForm from './components/powerform';
import InfoBox from './components/infobox';
import { IPowerItem, IPowerQuality } from './interfaces/power.interface';
import { PowerListActionKind, usePowerList } from './hooks/usePowerList';
import { createAction } from './helpers/Reducer';
import QualityHelper from './helpers/Quality.helper';
import ConfirmModal from './modals/confirm.modal';
import { Button } from 'react-bootstrap';

function App() {
  const [info, setInfo] = useState<IPowerItem>();
  const [openConfirmRemove, setOpenConfirmRemove] = useState<boolean>(false);
  const [savedPowers, setSavedPower] = usePowerList();
  const [selectedPower, setSelectedPower] = useState<string[]>([]);
  const [name, setName] = useState<string | undefined>(undefined);
  const [qualities, setQualities] = useState<IPowerQuality[] | undefined>(undefined);

  function savePower(name: string, qualities: IPowerQuality[]): void {
    setSavedPower(createAction(PowerListActionKind.UPDATE_POWER, {name: name, qualities: qualities}));
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
      console.log('removing', power);
      // setSavedPower(createAction(PowerListActionKind.DEL_POWER, power));
    }
    setSelectedPower([]);
    setOpenConfirmRemove(false);
  }
  function loadPower(name: string, qualities: IPowerQuality[]): void{
    setName(name);
    setQualities(qualities);
  }
  function calculateTotalCost(qualities: IPowerQuality[]): number{
    const totalCost = qualities.reduce((total: number, item: IPowerQuality) => total + QualityHelper.calculateCost(item), 0);
    return totalCost;
  }
  return (
    <div className="app">
      <header className="app__header"></header>
      <section className="app__form"><PowerForm name={name} qualities={qualities} showInfo={setInfo} onSavePower={savePower} /></section>
      <aside className="app__info"><InfoBox info={info} /></aside>
      <section className="app__powerlist">
        {Object.entries(savedPowers).map(([name, qualities], index) => {
          const cost = calculateTotalCost(qualities);
          return (
          <div className='app__poweritem' key={name} >
            <input type='checkbox' value={name} checked={selectedPower.indexOf(name) >= 0} onChange={() => selectPower(name)} />
            <span onClick={() => loadPower(name, qualities)}><strong>{name}</strong> ({cost}/{cost*2}/{cost*4})</span>
          </div>
        )})}
        <div className='app__powerlist-control'>
          <Button className='btn--neutral' ><i className='fa-solid fa-download'></i> Export</Button>
          <Button className='btn--neutral' ><i className='fa-solid fa-upload'></i> Import</Button>
          <button className='btn btn--delete' onClick={() => removeSelected()}><i className='fa-solid fa-trash'></i> Delete</button>
        </div>
      </section>
      <footer className="app__footer"></footer>
      <ConfirmModal show={openConfirmRemove} onConfirm={() => confirmRemovePower()} confirmButton='Delete'
        message={'Are you sure you want to remove all selected powers'} 
        onCancel={() => setOpenConfirmRemove(false)} header='Deleting power'  />
    </div>
  );
}

export default App;
