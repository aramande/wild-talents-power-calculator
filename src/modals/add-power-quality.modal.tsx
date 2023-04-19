import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPowerItem, IPowerQuality, TCapacity } from '../interfaces/power.interface';

interface AddPowerQualityModalProps {
  show: boolean,
  onClose: () => void
  onSave: (result: IPowerQuality) => void
}

const AddPowerQualityModal: React.FC<AddPowerQualityModalProps> = (props) => {
  let refCounter = 0;
  const [quality, setQuality] = useState('Attack');
  const [capacity, setCapacity] = useState<TCapacity>('Mass');
  const [multiplier, setMultiplier] = useState(1);
  const [cost, setCost] = useState(1);
  const [addedModifiers, setAddedModifiers] = useState<IPowerItem[]>([]);
  const [exampleModifier, setExampleModifierState] = useState<IPowerItem>(makeModifier('Custom'));
  const result: IPowerQuality = {
    ref: 0,
    multiplier: 0,
    cost: 1,
    name: quality,
    capacities: [capacity],
    modifiers: addedModifiers
  };
  const exampleModifiers: IPowerItem[] = [
    makeModifier('Custom'),
    makeModifier('Area'),
    makeModifier('Augment', 4),
    makeModifier('Booster'),
    makeModifier('Burn', 2),
    makeModifier('Controlled Effect'),
    makeModifier('Daze'),
    makeModifier('Deadly', 1, "+1 or +2"),
    makeModifier('Disintegrate'),
    makeModifier('Endless', 3),
    makeModifier('Engulf', 2),
    makeModifier('Go First'),
    makeModifier('Hardened Defense', 2),
    makeModifier('High Capacity'),
    makeModifier('Interference', 3),
    makeModifier('Native Power'),
    makeModifier('No Physics'),
    makeModifier('No Upward Limit', 2),
    makeModifier('Non-Physical', 2),
    makeModifier('On Sight'),
    makeModifier('Penetration'),
    makeModifier('Permanent', 4),
    makeModifier('Radius', 2),
    makeModifier('Power Capacity', 1, '+1 or +2'),
    makeModifier('Speeding Bullet', 2),
    makeModifier('Spray'),
    makeModifier('Subtle'),
    makeModifier('Traumatic'),
    makeModifier('Variable Effect', 4),
    makeModifier('If/Then', -1)
  ];

  function makeModifier(name: string, cost: number = 1, options?: string): IPowerItem {
    return { name: name, ref: refCounter++, cost: cost || cost, costOptions: options, multiplier: 1 };
  }

  function updateQuality(quality: string){
    if(isUnavailable(quality, capacity)){
      if(quality === 'Attack') setCapacity('Mass');
      if(quality === 'Defend') setCapacity('Self');
      if(quality === 'Useful') setCapacity('Mass');
    }
    setQuality(quality);
  }
  function addModifier(formData: FormData){
    setAddedModifiers((mods) => {
      const max = mods.reduce((prev, current) => (prev > current.ref) ? prev : current.ref, 0);
      
      return [...mods, {
        ref: max + 1,
        name: formData.get('name')?.toString(),
        specific: formData.get('specific')?.toString(),
        cost: cost,
        multiplier: multiplier
      }];
    });
  }
  function removeModifier(ref: number): void {
    setAddedModifiers((mods) => {
      return mods.filter(x => x.ref !== ref);
    });
  }
  function setExampleModifier(modifier: IPowerItem){
    setCost(modifier.cost);
    setExampleModifierState(modifier);
  }
  function sortModifiers(a: IPowerItem, b: IPowerItem): number {
    const aCost = a.cost > 0 ? a.cost + 10 : -a.cost;
    const bCost = b.cost > 0 ? b.cost + 10 : -b.cost; 
    return bCost - aCost;
  }

  function isActive(value: string, expected: string) {
    return value === expected ? 'btn--primary ' : '';
  }
  function isUnavailable(quality: string, capacity: string) {
    let disabled = false;
    switch(quality){
      case 'Attack':
        if(capacity !== 'Mass' && capacity !== 'Range') disabled = true;
        break;
      case 'Defend':
        if(capacity !== 'Self') disabled = true;
        break;
      case 'Useful':
        if(capacity !== 'Mass' && capacity !== 'Range' && capacity !== 'Speed') disabled = true;
        break;
    }
    return disabled ? 'btn--disabled ' : '';
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.onClose()}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add new Power Quality</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <section className='powerquality-modal'>
            <div>
              <div className="btn-group" role="group" aria-label="Power Quality">
                <Button type="button" className={isActive(quality, 'Attack') + 'btn'} onClick={() => updateQuality('Attack')}>Attack</Button>
                <Button type="button" className={isActive(quality, 'Defend') + 'btn'} onClick={() => updateQuality('Defend')}>Defend</Button>
                <Button type="button" className={isActive(quality, 'Useful') + 'btn'} onClick={() => updateQuality('Useful')}>Useful</Button>
              </div>
              <div className="btn-group" role="group" aria-label="Power Capacity">
                <Button type="button" className={isActive(capacity, 'Mass') + isUnavailable(quality, 'Mass') + 'btn'} onClick={() =>  setCapacity('Mass')}>Mass</Button>
                <Button type="button" className={isActive(capacity, 'Range') + isUnavailable(quality, 'Range') + 'btn'} onClick={() => setCapacity('Range')}>Range</Button>
                <Button type="button" className={isActive(capacity, 'Speed') + isUnavailable(quality, 'Speed') + 'btn'} onClick={() => setCapacity('Speed')}>Speed</Button>
                <Button type="button" className={isActive(capacity, 'Self') + isUnavailable(quality, 'Self') + 'btn'} onClick={() => setCapacity('Self')}>Self</Button>
              </div>

              <form onSubmit={(e) => { addModifier(new FormData(e.currentTarget)); e.preventDefault() }}>
                <input type="hidden" value='Custom' name='name' />
                <table className='form'>
                  <tbody>
                    <tr><td colSpan={2}><h3 className='form__header'>Extras/Flaws</h3></td></tr>
                    <tr>
                      <th className='form__label'>Name</th>
                      <td className='form__value'><input type="text" name='name' value={exampleModifier.name} disabled={true} /></td>
                    </tr>
                    <tr>
                      <th className='form__label'>Note</th>
                      <td className='form__value'><input type="text" name='specific' /></td>
                    </tr>
                    <tr>
                      <th className='form__label'>Cost</th>
                      <td className='form__value'><input type="number" name='cost' value={cost} onChange={(e) => setCost(parseInt(e.target.value))} /></td>
                    </tr>
                    <tr>
                      <th className='form__label'>Level</th>
                      <td className='form__value form__row'>
                        <button type="button" className='btn btn--transparent btn--small' onClick={() => setMultiplier(x => x > 2 ? x - 1 : 1)}><i className="fa-solid fa-minus"></i></button>
                        {multiplier}
                        <button type="button" className='btn btn--transparent btn--small' onClick={() => setMultiplier(x => x + 1)}><i className="fa-solid fa-plus"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><button className='btn btn--accent btn--small spaceabove--1' type='submit'>Add</button></td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <div className='spaceabove--2'>
                {addedModifiers.sort(sortModifiers).map(modifier => (
                  <div key={modifier.ref} className='flex flex--gap1 relative'>
                    <strong>{modifier.multiplier > 1 ? `+${modifier.multiplier} ` : ''}{modifier.name}</strong>
                    {modifier.specific && (<span>({modifier.specific})</span>)}
                    <small>{`(${modifier.cost * modifier.multiplier})`}</small>
                    <button type="button" className='btn btn--transparent btn--small absolute top--0 right--0' onClick={() => removeModifier(modifier.ref)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <aside>
              <div className='btnlist'>
                {exampleModifiers.map(x => (
                  <button key={x.ref} type="button" className={(exampleModifier.name === x.name ? 'btnlist__btn--active ' : '') + 'btnlist__btn'} onClick={() => setExampleModifier(x)} >
                    {x.name} ({x.costOptions ? x.costOptions : x.cost})
                  </button>
                ))}
              </div>
            </aside>
          </section>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClose()}>Cancel</Button>
          <Button variant="primary" className='btn--primary' onClick={() => {props.onSave(result); props.onClose()}}>Create</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );

};

export default AddPowerQualityModal;
