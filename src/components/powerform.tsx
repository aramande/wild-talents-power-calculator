import React, { useState } from 'react';
import PowerQuality, { calculateCost } from './powerquality';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import AddPowerQualityModal from '../modals/add-power-quality.modal';
import useModal from '../hooks/useModal';
import EditPowerQualityModal from '../modals/edit-power-quality.modal';
import { Button } from 'react-bootstrap';

interface PowerFormProps {
  showInfo: (info: IPowerItem) => void
}

const PowerForm: React.FC<PowerFormProps> = (props: PowerFormProps) => {
  const [name, setName] = useState<string>('Undefined Power');
  const [powerQualities, setPowerQualities] = useState<IPowerQuality[]>([]);
  const [editTarget, setEditTarget] = useState<IPowerQuality | undefined>(undefined);
  const [addQualityModalOpen, toggleAddQualityModal] = useModal();
  const [editQualityModalOpen, toggleEditQualityModal] = useModal();

  function closeAddQualityModal() {
    toggleAddQualityModal(false);
  }
  function closeEditQualityModal() {
    toggleEditQualityModal(false);
  }
  function editQuality(quality: IPowerQuality){
    setEditTarget(quality);
    toggleEditQualityModal(true);
  }
  
  const totalCost = powerQualities.reduce((total: number, item: IPowerQuality) => total + calculateCost(item), 0);

  function saveNewQuality(result: IPowerQuality): void {
    setPowerQualities((qualities) => [...qualities, result]);
  }

  function saveEditedQuality(result: IPowerQuality): void {
    setPowerQualities((qualities) => qualities.map(x => x.ref === result.ref ? result : x));
  }
  function savePower(): void{
    console.log('saving', name, powerQualities);
  }

  return (
    <section className='powerform'>
      <header>
        <h1><input onChange={(e) => setName(e.target.value)} value={name} /></h1>
      </header>
      <div className='powerform__dicecost'>({totalCost}/{totalCost*2}/{totalCost*4})</div>
      <article className='powerform__qualitylist'>
        {powerQualities.map(x => (
          <div key={x.ref} className='relative'>  
            <button className='powerform__edit btn btn--neutral' onClick={(() => editQuality(x))}><i className='fa-solid fa-edit'></i></button>
            <PowerQuality info={x} showInfo={props.showInfo}></PowerQuality>
          </div>
        ))}
      </article>
      <button className='powerform__add btn btn--neutral' onClick={() => toggleAddQualityModal(true)}><i className='fa-solid fa-plus'></i> Add power quality</button>
      <footer className='powerform__btnfooter'>
        <Button className='btn--delete'>Clear</Button>
        <Button className='btn--primary' onClick={() => savePower()}>Save</Button>
      </footer>
      <AddPowerQualityModal show={addQualityModalOpen} onClose={closeAddQualityModal} onSave={saveNewQuality} />
      <EditPowerQualityModal show={editQualityModalOpen} initialData={editTarget} onClose={closeEditQualityModal} onSave={saveEditedQuality} />
      
    </section>
  );

};

export default PowerForm;
