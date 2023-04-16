import React, { useState } from 'react';
import PowerQuality from './powerquality';
import { IPowerItemInfo, IPowerQualityInfo } from '../interfaces/power.interface';
import { Modal } from 'react-bootstrap';

interface PowerFormProps {
  showInfo: (info: IPowerItemInfo) => void
}

const PowerForm: React.FC<PowerFormProps> = (props: PowerFormProps) => {
  const [name, setName] = useState<string>();
  const [addQualityModalOpen, openAddQualityModal] = useState(false);

  function closeAddQualityModal() {
    openAddQualityModal(false);
  }
  

  const powerQualities: IPowerQualityInfo[] = [
    {ref: 1, name: 'Attack', level: 0, cost: 0}
  ];
  const info = powerQualities[0];
  
  info.modifiers = [];
  info.modifiers.push({
    ref: 2,
    cost: 2,
    level: 0,
    name: 'Duration',
  });
  info.modifiers.push({
    ref: 3,
    level: 2,
    name: 'Booster',
    dynamicCost: (level) => Math.max(1, level + 1)
  });
  info.modifiers.push({
    ref: 4,
    level: 0,
    name: 'If/Then',
    specific: 'Random disadvantage',
    cost: -1
  });

  return (
    <section className='powerform'>
      <header>
        <h1><input onChange={() => setName} value={name} /></h1>
      </header>
      <article className='powerform__qualitylist'>
        {powerQualities.map(x => (
          <PowerQuality key={x.ref} info={x} showInfo={props.showInfo}></PowerQuality>
        ))}
      </article>
      <button className='powerform__add btn btn--neutral' onClick={() => openAddQualityModal(true)}><i className='fa-solid fa-plus'></i> Add power quality</button>
      <footer></footer>
      <Modal
        show={addQualityModalOpen}
        onHide={closeAddQualityModal}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            {/* <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer> */}
          </Modal.Dialog>
        </Modal>
    </section>
  );

};

export default PowerForm;
