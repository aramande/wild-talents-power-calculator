import React, { useState } from 'react';
import { IPowerQuality } from '../interfaces/power.interface';
import QualityHelper from '../helpers/Quality.helper';

interface CapacityCalcProps {
  quality: IPowerQuality;
}

const baseMass = [50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];
const baseRange = [10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120];
const baseSpeed = [2, 5, 10, 20, 40, 80, 160, 320, 640, 1280];
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
  
  return (
    <>
      <h4>Dice distribution</h4>
      <div className='infobox__dice-distribution'>
        {state.mass && <><label htmlFor="MassDice">Mass</label><input min='1' type='number' id='MassDice' value={massDice} onChange={(e) => setMassDice(parseInt(e.target.value))}/></>}
        {state.range && <><label htmlFor="RangeDice">Range</label><input min='1' type='number' id='RangeDice' value={rangeDice} onChange={(e) => setRangeDice(parseInt(e.target.value))}/></>}
        {state.speed && <><label htmlFor="SpeedDice">Speed</label><input min='1' type='number' id='SpeedDice' value={speedDice} onChange={(e) => setSpeedDice(parseInt(e.target.value))}/></>}
      </div>
      {(state.mass && !state.range && !state.speed) && oneCapacity(boosterCount, baseMass, 'Mass', massDice, 'lbs')}
      {(!state.mass && state.range && !state.speed) && oneCapacity(boosterCount, baseRange, 'Range', rangeDice, 'yards')}
      {(!state.mass && !state.range && state.speed) && oneCapacity(boosterCount, baseSpeed, 'Speed', speedDice, 'yards')}
      {(!state.mass && state.range && state.speed) && twoCapacities(boosterCount, baseRange, 'Range', rangeDice, 'yards', baseSpeed, 'Speed', speedDice, 'yards')}
      {(state.mass && !state.range && state.speed) && twoCapacities(boosterCount, baseMass, 'Mass', massDice, 'lbs', baseSpeed, 'Speed', speedDice, 'yards')}
      {(state.mass && state.range && !state.speed) && twoCapacities(boosterCount, baseMass, 'Mass', massDice, 'lbs', baseRange, 'Range', rangeDice, 'yards')}
      {(state.mass && state.range && state.speed) && threeCapacities(boosterCount, massDice, rangeDice, speedDice)}
    </>
  );
};

function oneCapacity(boosters: number, baseValue: number[], type: string, dice: number, measure: string){
  const header = [];
  const rows = [];
  header.push(<tr><th></th><td>{type}</td></tr>);
  rows.push(<><tr><th>Booster {boosters}</th><td>{baseValue[dice-1] * Math.pow(10, boosters)} {measure}</td></tr></>)
  
  return (
    <>
      <table className='infobox__capacity-calculator'>
        <thead>
          {header}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}
function twoCapacities(boosters: number, firstBaseValue: number[], firstType: string, firstDice: number, firstMeasure: string, secondBaseValue: number[], secondType: string, secondDice: number, secondMeasure: string ){
  const header = [];
  const rows = [];
  header.push(<tr><th></th><td>{firstType}</td><td>{secondType}</td></tr>);
  for (let rowIndex = 0; rowIndex < boosters; rowIndex++) {
    const rowContent = [];
    for (let colIndex = 0; colIndex < boosters; colIndex++) {
      if(rowIndex + colIndex > boosters) rowContent.push(<><td></td><td></td></>);
      else rowContent.push(<></>);
    }
    rows.push(<tr><th>Booster {rowIndex}</th>
      <td className='border-left border-color--primary'>{firstBaseValue[firstDice-1] * Math.pow(10, rowIndex)} {firstMeasure}</td>
      <td>{secondBaseValue[secondDice-1] * Math.pow(10, boosters - rowIndex - 1)} {secondMeasure}</td>
    </tr>);
  }
  return (
    <>
      <table className='infobox__capacity-calculator'>
        <thead>
          {header}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

function threeCapacities(boosters: number, massDice: number, rangeDice: number, speedDice: number ){
  const headerRow = [];
  const header = [];
  const rows = [];
  for (let index = 0; index < boosters; index++) {
    headerRow.push(<th colSpan={3}>Booster {index}</th>)
  }
  header.push(<tr><th></th>{headerRow}</tr>);
  const secondaryHeaderRow = [];
  for (let index = 0; index < boosters; index++) {
    secondaryHeaderRow.push(<><td>Mass</td><td>Range</td><td>Speed</td></>)
  }
  header.push(<tr><th></th>{secondaryHeaderRow}</tr>);
  for (let rowIndex = 0; rowIndex < boosters; rowIndex++) {
    const rowContent = [];
    for (let colIndex = 0; colIndex < boosters; colIndex++) {
      if(rowIndex + colIndex >= boosters) rowContent.push(<><td></td><td></td><td></td></>);
      else rowContent.push(<>
        <td className='border-left border-color--primary'>{baseMass[massDice-1] * Math.pow(10, rowIndex)} lbs</td>
        <td>{baseRange[rangeDice-1] * Math.pow(10, colIndex)} yards</td>
        <td>{baseSpeed[speedDice-1] * Math.pow(10, boosters - rowIndex - colIndex - 1)} yards</td>
      </>);
    }
    rows.push(<tr><th>Booster {rowIndex}</th>{rowContent}</tr>);
  }
  return (
    <>
      <table className='infobox__capacity-calculator'>
        <thead>
          {header}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

export default CapacityCalc;
