import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IPowerItem, IPowerModifier, IPowerQuality, TCapacity } from '../interfaces/power.interface';
import { getDescription } from '../helpers/get-description';
import { calculateCost } from '../components/powerquality';
import { Modifiers } from '../helpers/get-modifiers';
import { PowerQualityActionKind, usePowerQuality } from '../hooks/usePowerQuality';
import { createAction } from '../helpers/Reducer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface PowerQualityEditorProps {
  initialData?: IPowerQuality,
  onChange: React.Dispatch<React.SetStateAction<IPowerQuality>>
}

const refCounter: {current: number} = {current: 0};
const PowerQualityEditor: React.FC<PowerQualityEditorProps> = (props: PowerQualityEditorProps) => {
  const [description, setDescription] = useState<string[]>([]);
  const [multiplier, setMultiplier] = useState(1);
  const [cost, setCost] = useState(1);
  const [quality, dispatch] = usePowerQuality(props.initialData);
  const [exampleModifier, setExampleModifierState] = useState<IPowerModifier>(Modifiers.extra[0]);
  
  useEffect(() => {
    props.onChange(quality);
  },[quality]);

  function setCapacity(capacity: TCapacity) {
    //TODO: Verify if able to set capacity
    dispatch(createAction(PowerQualityActionKind.SET_CAPACITY, capacity))
  }
  function updateQuality(qualityName: string){
    if(isUnavailable(qualityName, quality.capacities[0])){
      if(qualityName === 'Attack') setCapacity('Mass');
      if(qualityName === 'Defend') setCapacity('Self');
      if(qualityName === 'Useful') setCapacity('Mass');
    }
    dispatch(createAction(PowerQualityActionKind.SET_NAME, qualityName));
  }
  function addModifier(formData: FormData){
    const newMax = quality.modifiers ? Math.max(...quality.modifiers.map(x => x.ref)) : 0
    const ref = Math.max(newMax, quality.modifiers ? quality.modifiers.length : 0);
    const modifier: IPowerModifier = {
      ref: ref,
      name: formData.get('name')?.toString() ?? 'Custom',
      specific: formData.get('specific')?.toString(),
      cost: cost,
      multiplier: multiplier
    }
    dispatch(createAction(PowerQualityActionKind.ADD_MODIFIER, modifier));
  }
  function setQualityMultiplier(direction: boolean){
    if(direction) dispatch(createAction(PowerQualityActionKind.INC_MULTIPLIER, undefined));
    else          dispatch(createAction(PowerQualityActionKind.DEC_MULTIPLIER, undefined));
  }
  function removeModifier(ref: number): void {
    dispatch(createAction(PowerQualityActionKind.DEL_MODIFIER, ref))
  }
  function setExampleModifier(modifier: IPowerItem){
    setCost(modifier.cost);
    setDescription(getDescription(modifier.name));
    setExampleModifierState(modifier);
  }
  function sortModifiers(a: IPowerItem, b: IPowerItem): number {
    const aCost = a.cost > 0 ? a.cost + 10 : -a.cost;
    const bCost = b.cost > 0 ? b.cost + 10 : -b.cost; 
    return bCost - aCost;
  }
  function setEmulatedPower(state: boolean){
    dispatch(createAction(PowerQualityActionKind.SET_EMULATED, state))
  }

  function isActive(value: string|undefined, expected: string) {
    return value === expected ? 'btn--primary ' : '';
  }
  
  function isUnavailable(quality: string|undefined, capacity: string) {
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
    <section className='powerquality-modal'>
      <div className='powerquality-modal__creation'>
        <div className="btn-group" role="group" aria-label="Power Quality">
          <Button type="button" className={isActive(quality.name, 'Attack') + 'btn'} onClick={() => updateQuality('Attack')}>Attack</Button>
          <Button type="button" className={isActive(quality.name, 'Defend') + 'btn'} onClick={() => updateQuality('Defend')}>Defend</Button>
          <Button type="button" className={isActive(quality.name, 'Useful') + 'btn'} onClick={() => updateQuality('Useful')}>Useful</Button>
        </div>
        <div className="btn-group" role="group" aria-label="Power Capacity">
          <Button type="button" className={isActive(quality.capacities[0], 'Mass') + isUnavailable(quality.name, 'Mass') + 'btn'} onClick={() =>  setCapacity('Mass')}>Mass</Button>
          <Button type="button" className={isActive(quality.capacities[0], 'Range') + isUnavailable(quality.name, 'Range') + 'btn'} onClick={() => setCapacity('Range')}>Range</Button>
          <Button type="button" className={isActive(quality.capacities[0], 'Speed') + isUnavailable(quality.name, 'Speed') + 'btn'} onClick={() => setCapacity('Speed')}>Speed</Button>
          <Button type="button" className={isActive(quality.capacities[0], 'Self') + isUnavailable(quality.name, 'Self') + 'btn'} onClick={() => setCapacity('Self')}>Self</Button>
        </div>
        <div className='flex gap-1'>
          <strong>Level</strong>
          <button type="button" className='btn btn--transparent btn--small' onClick={() => setQualityMultiplier(false)}><i className="fa-solid fa-minus"></i></button>
            {quality.multiplier}
          <button type="button" className='btn btn--transparent btn--small' onClick={() => setQualityMultiplier(true)}><i className="fa-solid fa-plus"></i></button>
        </div>
        <div className='spaceabove--1'><input type='checkbox' id='emulated-power' checked={quality.emulatedPower} onChange={(e) => setEmulatedPower(e.target.checked)} /> <label htmlFor='emulated-power'>Emulated power</label></div>
        <div className='spaceabove--1'>Standard {quality.emulatedPower ? 'willpower' : 'die'} cost: {calculateCost(quality)}</div>

        <form onSubmit={(e) => { addModifier(new FormData(e.currentTarget)); e.preventDefault() }}>
          <table className='form'>
            <tbody>
              <tr><td colSpan={2}><h3 className='form__header'>Extras/Flaws</h3></td></tr>
              <tr>
                <th className='form__label'>Name</th>
                <td className='form__value'><input type="text" name='name' value={exampleModifier.name} readOnly={true} /></td>
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
          {quality.modifiers.sort(sortModifiers).map(modifier => (
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
      <aside className='powerquality-modal__examples'>
        <div className='btnlist'>
          {Modifiers.extra.map(x => (
            <button key={x.ref} type="button" className={(exampleModifier.name === x.name ? 'active ' : '') + 'btnlist__btn'} onClick={() => setExampleModifier(x)} >
              {x.name}{x.focus?(<sup>F</sup>):''} ({x.costOptions ? x.costOptions : '+' + x.cost})
            </button>
          ))}
        </div>
        <div className='btnlist'>
          {Modifiers.flaws.map(x => (
            <button key={x.ref} type="button" className={(exampleModifier.name === x.name ? 'active ' : '') + 'btnlist__btn'} onClick={() => setExampleModifier(x)} >
              {x.name}{x.focus?(<sup>F</sup>):''} ({x.costOptions ? x.costOptions : x.cost})
            </button>
          ))}
        </div>
      </aside>
      <div className='powerquality-modal__description'>
        {description.map((x, i) => (<ReactMarkdown key={i}>{x}</ReactMarkdown>))}
      </div>
    </section>
  );
};

export default PowerQualityEditor;
