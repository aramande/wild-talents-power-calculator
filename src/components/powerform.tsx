import React, { useEffect, useState } from 'react';
import PowerQuality from './powerquality';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import AddPowerQualityModal from '../modals/add-power-quality.modal';
import useModal from '../hooks/useModal';
import EditPowerQualityModal from '../modals/edit-power-quality.modal';
import { Button } from 'react-bootstrap';
import QualityHelper from '../helpers/Quality.helper';
import { Power } from '../hooks/usePowerList';

interface PowerFormProps {
  name?: string,
  power?: Power,
  showInfo: (info: IPowerItem) => void,
  onSavePower: (name: string, power: Power) => void
}

const PowerForm: React.FC<PowerFormProps> = (props: PowerFormProps) => {
  const [name, setName] = useState<string>('Undefined Power');
  const [powerQualities, setPowerQualities] = useState<IPowerQuality[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [editTarget, setEditTarget] = useState<IPowerQuality | undefined>(undefined);
  const [addQualityModalOpen, toggleAddQualityModal] = useModal();
  const [editQualityModalOpen, toggleEditQualityModal] = useModal();

  useEffect(() => {
    if(props.name) setName(props.name);
    if(props.power) {
      setPowerQualities(props.power.qualities); 
      setTags(props.power.tags);
    }
  }, [props.name, props.power])

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
  
  const totalCost = powerQualities.reduce((total: number, item: IPowerQuality) => total + QualityHelper.calculateCost(item), 0);

  function saveNewQuality(result: IPowerQuality): void {
    let identifier = result.specific;
    if(!result.specific || result.specific === ''){
      identifier = Math.trunc(Math.random() * 100000).toString();
    }
    result.ref = result.name + identifier;
    setPowerQualities((qualities) => [...qualities, result]);
  }
  function deleteQuality(ref: string): void {
    setPowerQualities((qualities) => qualities.filter(x => x.ref !== ref));
  }

  function saveEditedQuality(result: IPowerQuality): void {
    setPowerQualities((qualities) => qualities.map(x => x.ref === result.ref ? result : x));
  }
  function savePower(): void{
    const power = new Power(powerQualities, tags);
    props.onSavePower(name, power)
  }
  function clearPower(): void{
    setName('Undefined Power');
    setPowerQualities([]);
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
      <div>
        <button className='powerform__add btn btn--neutral' onClick={() => toggleAddQualityModal(true)}><i className='fa-solid fa-plus'></i> Add power quality</button>
      </div>
      <footer className='powerform__btnfooter'>
        <Button className='btn--delete'  onClick={() => clearPower()}>Clear</Button>
        <Button className='btn--primary' onClick={() => savePower()}>Save</Button>
      </footer>
      
      <AddPowerQualityModal show={addQualityModalOpen} onClose={closeAddQualityModal} onSave={saveNewQuality} />
      <EditPowerQualityModal show={editQualityModalOpen} initialData={editTarget} onClose={closeEditQualityModal} onDelete={deleteQuality} onSave={saveEditedQuality} />
    </section>
  );

};

export default PowerForm;
