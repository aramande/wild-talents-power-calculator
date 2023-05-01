import React, { useState } from 'react';
import PowerForm from './components/powerform';
import InfoBox from './components/infobox';
import { IPowerItem, IPowerQuality } from './interfaces/power.interface';
import { PowerListActionKind, usePowerList } from './hooks/usePowerList';
import { createAction } from './helpers/Reducer';
import QualityHelper from './helpers/Quality.helper';
import ConfirmModal from './modals/confirm.modal';
import { Button } from 'react-bootstrap';
import PowerList from './components/powerlist';

function App() {
  const [info, setInfo] = useState<IPowerItem>();
  const [savedPowers, setSavedPower] = usePowerList();
  const [name, setName] = useState<string | undefined>(undefined);
  const [qualities, setQualities] = useState<IPowerQuality[] | undefined>(undefined);

  function savePower(name: string, qualities: IPowerQuality[]): void {
    setSavedPower(createAction(PowerListActionKind.UPDATE_POWER, {name: name, qualities: qualities}));
  }
  function setPower(name: string, qualities: IPowerQuality[]): void{
    setName(name);
    setQualities(qualities);
  }
  return (
    <div className="app">
      <header className="app__header"></header>
      <section className="app__form"><PowerForm name={name} qualities={qualities} showInfo={setInfo} onSavePower={savePower} /></section>
      <aside className="app__info"><InfoBox info={info} /></aside>
      <section className="app__powerlist">
        <PowerList savedPowers={savedPowers} setPower={setPower} dispatchPower={setSavedPower} />
      </section>
      <footer className="app__footer"></footer>
    </div>
  );
}

export default App;
