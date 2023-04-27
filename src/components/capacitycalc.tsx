import React, { useState } from 'react';
import { IPowerQuality } from '../interfaces/power.interface';
import QualityHelper, { IState } from '../helpers/Quality.helper';
import OneCapacity from './CapacityTables/oneCapacity';
import TwoCapacities from './CapacityTables/twoCapacities';
import ThreeCapacities from './CapacityTables/threeCapacities';

interface CapacityCalcProps {
  quality: IPowerQuality;
}

const baseMass = [50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];
const baseRange = [10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120];
const baseSpeed = [2, 5, 10, 20, 40, 80, 160, 320, 640, 1280];
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
    if(this.type === 'Mass')  return 50 * Math.pow(2, this.dice-1);
    if(this.type === 'Range') return 10 * Math.pow(2, this.dice-1);
    if(this.type === 'Speed') return Math.trunc(2.5 * Math.pow(2, this.dice-1));
    return 0;
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
  const boosterCount = booster?.multiplier ? booster.multiplier + 1 : 0;
  
  const massCapacity = new Capacity('Mass', state, massDice);
  const rangeCapacity = new Capacity('Range', state, rangeDice);
  const speedCapacity = new Capacity('Speed', state, speedDice);
  return (
    <>
      <h4>Dice distribution</h4>
      <div className='infobox__dice-distribution'>
        {state.mass && <><label htmlFor="MassDice">Mass</label><input min='1' type='number' id='MassDice' value={massDice} onChange={(e) => setMassDice(parseInt(e.target.value))}/></>}
        {state.range && <><label htmlFor="RangeDice">Range</label><input min='1' type='number' id='RangeDice' value={rangeDice} onChange={(e) => setRangeDice(parseInt(e.target.value))}/></>}
        {state.speed && <><label htmlFor="SpeedDice">Speed</label><input min='1' type='number' id='SpeedDice' value={speedDice} onChange={(e) => setSpeedDice(parseInt(e.target.value))}/></>}
      </div>
      {(state.mass && !state.range && !state.speed) && <OneCapacity boosters={boosterCount} capacity={massCapacity} />}
      {(!state.mass && state.range && !state.speed) && <OneCapacity boosters={boosterCount} capacity={rangeCapacity} />}
      {(!state.mass && !state.range && state.speed) && <OneCapacity boosters={boosterCount} capacity={speedCapacity} />}
      {(!state.mass && state.range && state.speed) && <TwoCapacities boosters={boosterCount} firstCapacity={rangeCapacity} secondCapacity={speedCapacity}/>}
      {(state.mass && !state.range && state.speed) && <TwoCapacities boosters={boosterCount} firstCapacity={massCapacity} secondCapacity={rangeCapacity}/>}
      {(state.mass && state.range && !state.speed) && <TwoCapacities boosters={boosterCount} firstCapacity={massCapacity} secondCapacity={speedCapacity}/>}
      {(state.mass && state.range && state.speed) && <ThreeCapacities boosters={boosterCount} massCapacity={massCapacity} rangeCapacity={rangeCapacity} speedCapacity={speedCapacity} />}
    </>
  );
};





export default CapacityCalc;
