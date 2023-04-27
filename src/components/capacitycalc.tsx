import React, { useState } from 'react';
import { IPowerQuality } from '../interfaces/power.interface';
import QualityHelper, { IState } from '../helpers/Quality.helper';
import OneCapacity from './CapacityTables/oneCapacity';
import TwoCapacities from './CapacityTables/twoCapacities';
import ThreeCapacities from './CapacityTables/threeCapacities';

interface CapacityCalcProps {
  quality: IPowerQuality;
}

export type TCapacity = 'Mass'|'Range'|'Speed';
export class Capacity {
  private type: TCapacity;
  private state: IState;
  private dice: number;
  
  constructor(type: TCapacity, state: IState, dice: number) {
    this.type = type;
    this.state = state;
    this.dice = dice;
  }

  getType(): TCapacity{
    return this.type;
  }
  getValue(): number{
    if(this.dice === 0) return 0;
    if(this.type === 'Mass')  return 50 * Math.pow(2, this.dice-1);
    if(this.type === 'Range') return 10 * Math.pow(2, this.dice-1);
    if(this.type === 'Speed') return Math.trunc(2.5 * Math.pow(2, this.dice-1));
    return 0;
  }
  isMaxed(): boolean{
    if(this.type === 'Mass') return this.state.maxMass;
    if(this.type === 'Range') return this.state.maxRange;
    if(this.type === 'Speed') return this.state.maxSpeed;
    return false;
  }
  getMeasure(): string{
    if(this.type === 'Mass') return ' lbs';
    if(this.type === 'Range') return ' yards';
    if(this.type === 'Speed') return ' yards';
    return '';
  }
}
const CapacityCalc: React.FC<CapacityCalcProps> = ({ quality }) => {
  const [massDice, setMassDice] = useState(1);
  const [rangeDice, setRangeDice] = useState(1);
  const [speedDice, setSpeedDice] = useState(1);

  const state = QualityHelper.getState(quality);
  if(state.selfOnly || state.touchOnly || (!state.mass && !state.range && !state.speed)) {
    return <></>;
  }

  const booster = quality.modifiers.find(x => x.name.toLowerCase() === 'booster');
  const boosterCount = booster?.multiplier ? booster.multiplier : 0;
  
  const massCapacity = new Capacity('Mass', state, massDice);
  const rangeCapacity = new Capacity('Range', state, rangeDice);
  const speedCapacity = new Capacity('Speed', state, speedDice);

  function isOnlyMass(): boolean{
    return state.mass && !state.maxMass && (!state.range || state.maxRange) && (!state.speed || state.maxSpeed);
  }
  function isOnlyRange(): boolean{
    return (!state.mass || state.maxMass) && state.range && !state.maxRange && (!state.speed || state.maxSpeed);
  }
  function isOnlySpeed(): boolean{
    return (!state.mass || state.maxMass) && (!state.range || state.maxRange) && state.speed && !state.maxSpeed;
  }
  function isRangeAndSpeed(): boolean{
    return (!state.mass || state.maxMass) && state.range && !state.maxRange && state.speed && !state.maxSpeed;
  }
  function isMassAndRange(): boolean{
    return state.mass && !state.maxMass && state.range && !state.maxRange && (!state.speed || state.maxSpeed);
  }
  function isMassAndSpeed(): boolean{
    return state.mass && !state.maxMass && (!state.range || state.maxRange) && state.speed && !state.maxSpeed;
  }
  function isAll(): boolean{
    return state.mass && !state.maxMass && state.range && !state.maxRange && state.speed && !state.maxRange;
  }

  return (
    <>
      <h4>Dice distribution</h4>
      <div className='infobox__dice-distribution'>
        {state.mass && <><label htmlFor="MassDice">Mass</label><input min='0' type='number' id='MassDice' value={massDice} onChange={(e) => setMassDice(parseInt(e.target.value))}/></>}
        {state.range && <><label htmlFor="RangeDice">Range</label><input min='0' type='number' id='RangeDice' value={rangeDice} onChange={(e) => setRangeDice(parseInt(e.target.value))}/></>}
        {state.speed && <><label htmlFor="SpeedDice">Speed</label><input min='0' type='number' id='SpeedDice' value={speedDice} onChange={(e) => setSpeedDice(parseInt(e.target.value))}/></>}
      </div>
      {isOnlyMass() && <OneCapacity reduced={state.reduced} boosters={boosterCount} capacity={massCapacity} offCapacity={rangeCapacity} offCapacity2={speedCapacity} />}
      {isOnlyRange() && <OneCapacity reduced={state.reduced} boosters={boosterCount} capacity={rangeCapacity} offCapacity={massCapacity} offCapacity2={speedCapacity} />}
      {isOnlySpeed() && <OneCapacity reduced={state.reduced} boosters={boosterCount} capacity={speedCapacity} offCapacity={rangeCapacity} offCapacity2={massCapacity} />}
      {isRangeAndSpeed() && <TwoCapacities reduced={state.reduced} boosters={boosterCount} firstCapacity={rangeCapacity} secondCapacity={speedCapacity} offCapacity={massCapacity} />}
      {isMassAndSpeed() && <TwoCapacities reduced={state.reduced} boosters={boosterCount} firstCapacity={massCapacity} secondCapacity={speedCapacity} offCapacity={rangeCapacity} />}
      {isMassAndRange() && <TwoCapacities reduced={state.reduced} boosters={boosterCount} firstCapacity={massCapacity} secondCapacity={rangeCapacity} offCapacity={speedCapacity} />}
      {isAll() && <ThreeCapacities reduced={state.reduced} boosters={boosterCount} massCapacity={massCapacity} rangeCapacity={rangeCapacity} speedCapacity={speedCapacity} />}
    </>
  );
};





export default CapacityCalc;
