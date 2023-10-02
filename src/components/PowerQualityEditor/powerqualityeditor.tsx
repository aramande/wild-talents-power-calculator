import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IPowerItem, IPowerModifier, IPowerQuality, TCapacity, TType } from '../../interfaces/power.interface';
import { getDescription } from '../../helpers/get-description';
import { Modifiers, getDisplayCost } from '../../helpers/get-modifiers';
import { PowerQualityActionKind, usePowerQuality } from '../../hooks/usePowerQuality';
import { createAction } from '../../helpers/Reducer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import QualityHelper from '../../helpers/Quality.helper';
import style from './powerqualityeditor.module.scss';
import useModal from '../../hooks/useModal';
import { guid } from '../../helpers/GUID';
import ModifierPickerModal from '../ModifierPickerModal/modifierpickermodal';
import ConfirmModal from '../../modals/confirm.modal';

interface PowerQualityEditorProps {
  initialData?: IPowerQuality;
  onChange: React.Dispatch<React.SetStateAction<IPowerQuality>>;
}

const PowerQualityEditor: React.FC<PowerQualityEditorProps> = ({ initialData, onChange }: PowerQualityEditorProps) => {
  const [description, setDescription] = useState<string[]>([]);
  const [quality, dispatch] = usePowerQuality(initialData);
  const [currentModifierPicker, setCurrentModifierPicker] = useState<IPowerModifier|undefined>();
  const [openModifierPicker, setOpenModifierPicker] = useModal();
  const [removeModalOpen, toggleRemoveModal ] = useModal();
 
  const toRemove = useRef<IPowerModifier|undefined>();
  useEffect(() => {
    onChange(quality);
  }, [quality, onChange]);

  function setCapacity(capacity: TCapacity) {
    dispatch(createAction(PowerQualityActionKind.SET_MAIN_CAPACITY, capacity));
  }
  function updateQuality(qualityName: string) {
    if (isUnavailable(qualityName, quality.capacity)) {
      if (qualityName === 'Attack') setCapacity('Mass');
      if (qualityName === 'Defend') setCapacity('Self');
      if (qualityName === 'Useful') setCapacity('Mass');
    }
    dispatch(createAction(PowerQualityActionKind.SET_NAME, qualityName));
  }
  
  function setQualityMultiplier(direction: boolean) {
    if (direction) dispatch(createAction(PowerQualityActionKind.INC_MULTIPLIER, undefined));
    else dispatch(createAction(PowerQualityActionKind.DEC_MULTIPLIER, undefined));
  }
  function setQualitySpecific(specific: string) {
    dispatch(createAction(PowerQualityActionKind.SET_SPECIFIC, specific));
  }
  function askRemoveModifier(modifier: IPowerModifier): void {
    toRemove.current = modifier;
    toggleRemoveModal(true);
  }
  function removeModifier(ref: string): void {
    dispatch(createAction(PowerQualityActionKind.DEL_MODIFIER, ref));
    toggleRemoveModal(false)
  }
  function setExampleModifier(modifier: IPowerItem) {
    setDescription(getDescription(modifier.name));
  }
  function sortModifiers(a: IPowerItem, b: IPowerItem): number {
    const aCost = a.cost > 0 ? a.cost + 10 : -a.cost;
    const bCost = b.cost > 0 ? b.cost + 10 : -b.cost;
    return bCost - aCost;
  }
  function setPowerType(state: TType) {
    dispatch(createAction(PowerQualityActionKind.SET_POWER_TYPE, state));
  }

  function isActive(value: string | undefined, expected: string) {
    return value === expected ? 'btn--primary ' : '';
  }

  function isUnavailable(quality: string | undefined, capacity: string) {
    let disabled = false;
    switch (quality) {
      case 'Attack':
        if (capacity !== 'Mass' && capacity !== 'Range') disabled = true;
        break;
      case 'Defend':
        if (capacity !== 'Self') disabled = true;
        break;
      case 'Useful':
        if (capacity !== 'Mass' && capacity !== 'Range' && capacity !== 'Speed') disabled = true;
        break;
    }
    return disabled ? 'btn--disabled ' : '';
  }

  function openAddModifier(): void {
    const modifier: IPowerModifier = {
      ref: guid(),
      name: '',
      specific: '',
      cost: 0,
      multiplier: 1,
    };
    setCurrentModifierPicker(modifier);
    setOpenModifierPicker(true);
  }
  function openEditModifier(modifier: IPowerModifier): void {
    setCurrentModifierPicker(modifier);
    setOpenModifierPicker(true);
  }

  function onModifierPickerClose(){
    setOpenModifierPicker(false);
  }
  function onModifierPickerSave(modifier: IPowerModifier){
    let found = quality.modifiers.find((x) => x.ref === modifier.ref);
    if(!found) {
      found = quality.modifiers.find((x) => (x.name === modifier.name && x.specific === modifier.specific))
    }
    if (!found) {
      const result: IPowerModifier = {
        ref: modifier.ref,
        name: modifier.name,
        specific: modifier.specific,
        cost: modifier.cost,
        multiplier: modifier.multiplier,
      };
      dispatch(createAction(PowerQualityActionKind.ADD_MODIFIER, result));
    } else {
      found.ref = modifier.ref;
      found.name = modifier.name;
      found.specific = modifier.specific;
      found.multiplier = modifier.multiplier;
      found.cost = modifier.cost;
    }
    setOpenModifierPicker(false);
  }

  return (
    <section className={`${style.editor}`}>
      <div className={style.creation}>
        <div className="btn-group" role="group" aria-label="Power Quality">
          <Button
            type="button"
            className={isActive(quality.name, 'Attack') + 'btn'}
            onClick={() => updateQuality('Attack')}
          >
            Attack
          </Button>
          <Button
            type="button"
            className={isActive(quality.name, 'Defend') + 'btn'}
            onClick={() => updateQuality('Defend')}
          >
            Defend
          </Button>
          <Button
            type="button"
            className={isActive(quality.name, 'Useful') + 'btn'}
            onClick={() => updateQuality('Useful')}
          >
            Useful
          </Button>
        </div>
        <div className="btn-group" role="group" aria-label="Power Capacity">
          <Button
            type="button"
            className={isActive(quality.capacity, 'Mass') + isUnavailable(quality.name, 'Mass') + 'btn'}
            onClick={() => setCapacity('Mass')}
          >
            Mass
          </Button>
          <Button
            type="button"
            className={isActive(quality.capacity, 'Range') + isUnavailable(quality.name, 'Range') + 'btn'}
            onClick={() => setCapacity('Range')}
          >
            Range
          </Button>
          <Button
            type="button"
            className={isActive(quality.capacity, 'Speed') + isUnavailable(quality.name, 'Speed') + 'btn'}
            onClick={() => setCapacity('Speed')}
          >
            Speed
          </Button>
          <Button
            type="button"
            className={isActive(quality.capacity, 'Self') + isUnavailable(quality.name, 'Self') + 'btn'}
            onClick={() => setCapacity('Self')}
          >
            Self
          </Button>
        </div>
        <div className="flex gap-1">
          <strong>Level</strong>
          <button type="button" className="btn btn--transparent btn--small" onClick={() => setQualityMultiplier(false)}>
            <i className="fa-solid fa-minus"></i>
          </button>
          {quality.multiplier}
          <button type="button" className="btn btn--transparent btn--small" onClick={() => setQualityMultiplier(true)}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="spaceabove--1">
          <label htmlFor="quality-specific">Note</label>{' '}
          <input
            type="text"
            id="quality-specific"
            value={quality.specific}
            onChange={(e) => setQualitySpecific(e.target.value)}
          />
        </div>
        <div className="spaceabove--1">
          <label htmlFor="power-type">Type</label>
          <select
            name="power-type"
            id="power-type"
            onChange={(e) => setPowerType(e.currentTarget.value as TType)}
            defaultValue={quality.type}
          >
            <option value="normal">Normal</option>
            <option value="emulated">Emulated</option>
            <option value="hyperstat">HyperStat</option>
            <option value="hyperskill">HyperSkill</option>
          </select>
        </div>
        <div className="spaceabove--1">
          Standard {quality.type === 'emulated' ? 'willpower' : 'die'} cost: {QualityHelper.calculateCost(quality)}
        </div>
        <div className="spaceabove--1">Capacities: {QualityHelper.getCapacities(quality).join(', ')}</div>

        <div className="spaceabove--2">
          {quality.modifiers.sort(sortModifiers).map((modifier) => (
            <div key={modifier.ref} className={style.modifier} onClick={() => setExampleModifier(modifier)}>
              <strong>
                {modifier.multiplier > 1 ? `+${modifier.multiplier} ` : ''}
                {modifier.name}
              </strong>
              {modifier.specific && <span>({modifier.specific})</span>}
              <small>{`(${modifier.cost * modifier.multiplier})`}</small>
              <button
                type="button"
                className="btn btn--transparent btn--small absolute top--0 right--5"
                onClick={() => openEditModifier(modifier)}
              >
                <i className="fa-solid fa-edit"></i>
              </button>
              <button
                type="button"
                className="btn btn--transparent btn--small absolute top--0 right--0"
                onClick={() => askRemoveModifier(modifier)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
        <button className="btn btn--accent btn--small spaceabove--1" type="button" onClick={() => openAddModifier()}>
          Add Extra/Flaw
        </button> 
      </div>
      <div className={`${style.description}`}>
        {description.map((x, i) => (
          <ReactMarkdown key={i}>{x}</ReactMarkdown>
        ))}
      </div>
      {toRemove.current && (<ConfirmModal width={'300px'} show={removeModalOpen} header={'Unsaved Changes'} message={[`Are you sure you want to remove '${toRemove.current.name}'?`]} 
        onCancel={() => toggleRemoveModal(false)} 
        onConfirm={() => toRemove.current && removeModifier(toRemove.current.ref)} />)}
      {currentModifierPicker && (<ModifierPickerModal onClose={() => onModifierPickerClose()} onSave={(modifier: IPowerModifier) => onModifierPickerSave(modifier)} show={openModifierPicker} initialData={currentModifierPicker} />)}
    </section>
  );
};

export default PowerQualityEditor;
