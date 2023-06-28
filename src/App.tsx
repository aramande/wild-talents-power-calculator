import { useState } from 'react';
import PowerForm from './components/PowerForm/powerform';
import InfoBox from './components/InfoBox/infobox';
import { IPowerItem } from './interfaces/power.interface';
import { Power, PowerListActionKind, usePowerList } from './hooks/usePowerList';
import { createAction } from './helpers/Reducer';
import PowerList from './components/PowerList/powerlist';

function App() {
  const [info, setInfo] = useState<IPowerItem>();
  const [savedPowers, setSavedPower, tagSuggestions] = usePowerList();
  const [name, setName] = useState<string | undefined>(undefined);
  const [power, setPowerState] = useState<Power | undefined>(undefined);

  function savePower(name: string, power: Power): void {
    setSavedPower(createAction(PowerListActionKind.UPDATE_POWER_OBJ, { name: name, power: power }));
  }
  function setPower(name: string, power: Power): void {
    setName(name);
    setPowerState(power);
  }
  return (
    <div className="app">
      <header className="app__header"></header>
      <section className="app__form">
        <PowerForm
          name={name}
          power={power}
          tagSuggestions={tagSuggestions}
          showInfo={setInfo}
          onSavePower={savePower}
        />
      </section>
      <aside className="app__info">
        <InfoBox info={info} />
      </aside>
      <section className="app__powerlist">
        <PowerList
          savedPowers={savedPowers}
          tagSuggestions={tagSuggestions}
          setPower={setPower}
          dispatchPower={setSavedPower}
        />
      </section>
      <footer className="app__footer"></footer>
    </div>
  );
}

export default App;
