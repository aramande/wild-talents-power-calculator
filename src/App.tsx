import React, { useState } from 'react';
import PowerForm from './components/powerform';
import InfoBox from './components/infobox';
import { IPowerItem, IPowerQuality } from './interfaces/power.interface';
import { PowerListActionKind, usePowerList } from './hooks/usePowerList';
import { createAction } from './helpers/Reducer';
import QualityHelper from './helpers/Quality.helper';
import ConfirmModal from './modals/confirm.modal';

function App() {
  const [info, setInfo] = useState<IPowerItem>();
  const [powerToRemove, setPowerToRemove] = useState<string>();
  const [savedPowers, setSavedPower] = usePowerList();
  const [name, setName] = useState<string | undefined>(undefined);
  const [qualities, setQualities] = useState<IPowerQuality[] | undefined>(undefined);

  function savePower(name: string, qualities: IPowerQuality[]): void {
    setSavedPower(createAction(PowerListActionKind.UPDATE_POWER, {name: name, qualities: qualities}));
  }
  function removePower(name: string): void{
    setPowerToRemove(name);
  }
  function confirmRemovePower(): void{
    setSavedPower(createAction(PowerListActionKind.DEL_POWER, powerToRemove));
    cancelRemovePower();
  }
  function cancelRemovePower(): void{
    setPowerToRemove(undefined)
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
        {Object.entries(savedPowers).map(([name, qualities]) => {
          const cost = calculateTotalCost(qualities);
          return (
          <div className='app__poweritem' key={name} >
            <button className='btn btn--neutral' onClick={() => removePower(name)}><i className='fa-solid fa-trash'></i></button>
            <span onClick={() => loadPower(name, qualities)}><strong>{name}</strong> ({cost}/{cost*2}/{cost*4})</span>
          </div>
        )})}
      </section>
      <footer className="app__footer"></footer>
      <ConfirmModal show={powerToRemove !== undefined} onConfirm={() => confirmRemovePower()} confirmButton='Delete'
        message={'Are you sure you want to remove ' + (powerToRemove ?? '')} 
        onCancel={() => cancelRemovePower()} header='Deleting power'  />
    </div>
  );
}

export default App;
