import React, { useState } from 'react';
import PowerForm from './components/powerform';
import InfoBox, { IPowerItemInfo } from './components/infobox';

function App() {
  const [info, setInfo] = useState<IPowerItemInfo>();

  return (
    <div className="app">
      <header className="app__header"></header>
      <section className="app__form"><PowerForm showInfo={setInfo} /></section>
      <aside className="app__info"><InfoBox info={info} /></aside>
      <section className="app__powerlist"></section>
      <footer className="app__footer"></footer>
    </div>
  );
}

export default App;
