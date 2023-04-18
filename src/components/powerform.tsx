import React, { useState } from 'react';
import PowerQuality, { calculateCost } from './powerquality';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import AddPowerQualityModal from '../modals/add-power-quality.modal';
import useModal from '../hooks/useModal';

interface PowerFormProps {
  showInfo: (info: IPowerItem) => void
}

const PowerForm: React.FC<PowerFormProps> = (props: PowerFormProps) => {
  const [name, setName] = useState<string>('Undefined Power');
  const [powerQualities, setPowerQualities] = useState<IPowerQuality[]>([]);
  const [addQualityModalOpen, toggleAddQualityModal] = useModal();

  function closeAddQualityModal() {
    toggleAddQualityModal(false);
  }
  

  // const powerQualities: IPowerQuality[] = [
  //   {ref: 1, name: 'Attack', multiplier: 0, cost: 1, capacities: ['Range']}
  // ];
  // const info = powerQualities[0];
  
  // info.modifiers = [];
  // info.modifiers.push({
  //   ref: 2,
  //   cost: 2,
  //   multiplier: 1,
  //   name: 'Duration',
  // });
  // info.modifiers.push({
  //   ref: 3,
  //   multiplier: 2,
  //   cost: 1,
  //   name: 'Booster',
  // });
  // info.modifiers.push({
  //   ref: 4,
  //   multiplier: 1,
  //   name: 'If/Then',
  //   specific: 'Random disadvantage',
  //   cost: -1
  // });
  const totalCost = powerQualities.reduce((total: number, item: IPowerQuality) => total + calculateCost(item), 0);

  function saveNewQuality(result: IPowerQuality): void {
    setPowerQualities((qualities) => [...qualities, result]);
    console.log('saving result', result);
  }

  return (
    <section className='powerform'>
      <header>
        <h1><input onChange={() => setName} value={name} /></h1>
      </header>
      <div className='powerform__dicecost'>({totalCost}/{totalCost*2}/{totalCost*4})</div>
      <article className='powerform__qualitylist'>
        {powerQualities.map(x => (
          <PowerQuality key={x.ref} info={x} showInfo={props.showInfo}></PowerQuality>
        ))}
      </article>
      <button className='powerform__add btn btn--neutral' onClick={() => toggleAddQualityModal(true)}><i className='fa-solid fa-plus'></i> Add power quality</button>
      <footer></footer>
      <AddPowerQualityModal show={addQualityModalOpen} onClose={closeAddQualityModal} onSave={saveNewQuality} />
    </section>
  );

};

export default PowerForm;
