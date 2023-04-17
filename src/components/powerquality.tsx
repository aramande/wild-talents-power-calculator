import React from 'react';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import PowerModifier from './powermodfier';

interface PowerQualityProps {
  info: IPowerQuality;
  showInfo: (info: IPowerItem) => void
}

export function calculateCost(info: IPowerQuality) {
  const powerQualityBaseCost = 2 + Math.max(0, info.cost * info.multiplier);
  const modifierSumCost = info.modifiers ? info.modifiers.reduce((prev, cur) => prev + cur.cost * cur.multiplier, 0) : 0;
  return Math.max(1, powerQualityBaseCost + modifierSumCost);
}

const PowerQuality: React.FC<PowerQualityProps> = ({ info, showInfo }) => {
  const cost = calculateCost(info);

  return (
    <>
      <header className='powerquality'>
        <h2 className='powerquality__name' onClick={() => showInfo(info)}>{info.multiplier > 1 ? `+${info.multiplier} ` : ''}{info.name}</h2>
        <small className="powerquality__cost">{`(${cost})`}</small>
        <button className='powerquality__edit btn btn--neutral'><i className='fa-solid fa-edit'></i></button>
      </header>
      {info.modifiers && info.modifiers.map(x => (
        <div key={x.ref}><PowerModifier info={x} showInfo={showInfo} /></div>
      ))}
    </>
  );
};

export default PowerQuality;
