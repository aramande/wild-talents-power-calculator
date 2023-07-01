import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IPowerItem, IPowerModifier, IPowerQuality, TCapacity } from '../../interfaces/power.interface';
import { getDescription } from '../../helpers/get-description';
import { Modifiers, getDisplayCost } from '../../helpers/get-modifiers';
import { PowerQualityActionKind, usePowerQuality } from '../../hooks/usePowerQuality';
import { createAction } from '../../helpers/Reducer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import QualityHelper from '../../helpers/Quality.helper';
import style from './powerqualityeditor.module.scss';

interface PowerQualityEditorProps {
  initialData?: IPowerQuality;
  onChange: React.Dispatch<React.SetStateAction<IPowerQuality>>;
}

const PowerQualityEditor: React.FC<PowerQualityEditorProps> = ({ initialData, onChange }: PowerQualityEditorProps) => {
  const [description, setDescription] = useState<string[]>([]);
  const [multiplier, setMultiplier] = useState(1);
  const [specific, setSpecific] = useState<string>('');
  const [cost, setCost] = useState(1);
  const [quality, dispatch] = usePowerQuality(initialData);
  const [exampleModifier, setExampleModifierState] = useState<IPowerModifier>(Modifiers.extra[0]);
  const [filter, setFilter] = useState<string>('');
  const [focusFilter, setFocusFilter] = useState<boolean>(false);

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
  function addModifier(formData: FormData) {
    const name = formData.get('name')?.toString() ?? 'Custom';
    const ref = name + specific;
    const found = quality.modifiers.find((x) => x.name === name && x.specific === specific);
    if (!found) {
      const modifier: IPowerModifier = {
        ref: ref,
        name: name,
        specific: specific,
        cost: cost,
        multiplier: multiplier,
      };
      dispatch(createAction(PowerQualityActionKind.ADD_MODIFIER, modifier));
    } else {
      found.multiplier = found.multiplier + 1;
    }
    setMultiplier(1);
    setSpecific('');
  }
  function setQualityMultiplier(direction: boolean) {
    if (direction) dispatch(createAction(PowerQualityActionKind.INC_MULTIPLIER, undefined));
    else dispatch(createAction(PowerQualityActionKind.DEC_MULTIPLIER, undefined));
  }
  function setQualitySpecific(specific: string) {
    dispatch(createAction(PowerQualityActionKind.SET_SPECIFIC, specific));
  }
  function removeModifier(ref: string): void {
    dispatch(createAction(PowerQualityActionKind.DEL_MODIFIER, ref));
  }
  function setExampleModifier(modifier: IPowerItem) {
    setCost(modifier.cost);
    setDescription(getDescription(modifier.name));
    setExampleModifierState(modifier);
  }
  function sortModifiers(a: IPowerItem, b: IPowerItem): number {
    const aCost = a.cost > 0 ? a.cost + 10 : -a.cost;
    const bCost = b.cost > 0 ? b.cost + 10 : -b.cost;
    return bCost - aCost;
  }
  function setEmulatedPower(state: boolean) {
    dispatch(createAction(PowerQualityActionKind.SET_EMULATED, state));
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
  function shouldShow(item: IPowerModifier): boolean {
    if (!focusFilter && item.focus) return false;
    if (filter.length > 0 && item.name.toLowerCase().indexOf(filter) < 0) return false;
    return true;
  }

  return (
    <section className={style.editor}>
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
          <input
            type="checkbox"
            id="emulated-power"
            checked={quality.emulatedPower}
            onChange={(e) => setEmulatedPower(e.target.checked)}
          />{' '}
          <label htmlFor="emulated-power">Emulated power</label>
        </div>
        <div className="spaceabove--1">
          Standard {quality.emulatedPower ? 'willpower' : 'die'} cost: {QualityHelper.calculateCost(quality)}
        </div>
        <div className="spaceabove--1">Capacities: {QualityHelper.getCapacities(quality).join(', ')}</div>

        <form
          onSubmit={(e) => {
            addModifier(new FormData(e.currentTarget));
            e.preventDefault();
          }}
        >
          <table className="form">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <h3 className="form__header">Extras/Flaws</h3>
                </td>
              </tr>
              <tr>
                <th className="form__label">Name</th>
                <td className="form__value">
                  <input type="text" name="name" value={exampleModifier.name} readOnly={true} />
                </td>
              </tr>
              <tr>
                <th className="form__label">Note</th>
                <td className="form__value">
                  <input type="text" name="specific" value={specific} onChange={(e) => setSpecific(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th className="form__label">Cost</th>
                <td className="form__value">
                  <input type="number" name="cost" value={cost} onChange={(e) => setCost(parseInt(e.target.value))} />
                </td>
              </tr>
              <tr>
                <th className="form__label">Level</th>
                <td className="form__value form__row">
                  <button
                    type="button"
                    className="btn btn--transparent btn--small"
                    onClick={() => setMultiplier((x) => (x > 2 ? x - 1 : 1))}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  {multiplier}
                  <button
                    type="button"
                    className="btn btn--transparent btn--small"
                    onClick={() => setMultiplier((x) => x + 1)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="btn btn--accent btn--small spaceabove--1" type="submit">
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div className="spaceabove--2">
          {quality.modifiers.sort(sortModifiers).map((modifier) => (
            <div key={modifier.ref} className={style.modifier}>
              <strong>
                {modifier.multiplier > 1 ? `+${modifier.multiplier} ` : ''}
                {modifier.name}
              </strong>
              {modifier.specific && <span>({modifier.specific})</span>}
              <small>{`(${modifier.cost * modifier.multiplier})`}</small>
              <button
                type="button"
                className="btn btn--transparent btn--small absolute top--0 right--0"
                onClick={() => removeModifier(modifier.ref)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <aside className={style.examples}>
        <div className={style.pair}>
          <div>
            <label htmlFor="filter">Filter</label>{' '}
            <input type="text" id="filter" value={filter} onChange={(e) => setFilter(e.target.value.toLowerCase())} />
          </div>
          <div>
            <input
              type="checkbox"
              id="focusFilter"
              checked={focusFilter}
              onChange={(e) => setFocusFilter(e.target.checked)}
            />{' '}
            <label htmlFor="focusFilter">Show Focus Extras/Flaws</label>
          </div>
        </div>

        <div className={`${style.pair} ${style.scrollarea}`}>
          <div className={`${style.extras} btnlist`}>
            {Modifiers.extra
              .filter((x) => shouldShow(x))
              .map((x) => (
                <button
                  key={x.ref}
                  type="button"
                  className={(exampleModifier.name === x.name ? 'active ' : '') + 'btnlist__btn'}
                  onClick={() => setExampleModifier(x)}
                >
                  {x.name}
                  {x.focus ? <sup>F</sup> : ''} ({getDisplayCost(x)})
                </button>
              ))}
          </div>
          <div className={`${style.flaws} btnlist`}>
            {Modifiers.flaws
              .filter((x) => shouldShow(x))
              .map((x) => (
                <button
                  key={x.ref}
                  type="button"
                  className={(exampleModifier.name === x.name ? 'active ' : '') + 'btnlist__btn'}
                  onClick={() => setExampleModifier(x)}
                >
                  {x.name}
                  {x.focus ? <sup>F</sup> : ''} ({getDisplayCost(x)})
                </button>
              ))}
          </div>
        </div>
        {focusFilter ? (
          <small>
            <sup>F</sup> Only available for Focuses
          </small>
        ) : (
          <small></small>
        )}
      </aside>
      <div className={`${style.description}`}>
        {description.map((x, i) => (
          <ReactMarkdown key={i}>{x}</ReactMarkdown>
        ))}
      </div>
    </section>
  );
};

export default PowerQualityEditor;
