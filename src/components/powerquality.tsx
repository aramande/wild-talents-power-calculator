import React from 'react';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import PowerModifier from './powermodfier';

interface PowerQualityProps {
  info: IPowerQuality;
  showInfo: (info: IPowerItem) => void
}

export function calculateCost(info: IPowerQuality) {
  
  const powerQualityBaseCost = (info.emulatedPower ? 0 : 2) + Math.max(0, info.cost * info.multiplier);
  const modifierSumCost = info.modifiers ? info.modifiers.reduce((prev, cur) => prev + cur.cost * cur.multiplier, 0) : 0;
  return Math.max((info.emulatedPower ? 0 : 1), powerQualityBaseCost + modifierSumCost);
}

const PowerQuality: React.FC<PowerQualityProps> = ({ info, showInfo }) => {
  const cost = calculateCost(info);

  return (
    <div className='powerquality'>
      <header className='powerquality__row'>
        <h2 className='powerquality__name' onClick={() => showInfo(info)}>{info.multiplier > 0 ? `+${info.multiplier} ` : ''}{info.name}</h2>
        <small className="powerquality__cost">{`(${cost})`}</small>
        <button className='powerquality__edit btn btn--neutral'><i className='fa-solid fa-edit'></i></button>
      </header>
      <small>Capacities: {info.capacities.join(', ')}</small>
      <div className='powerquality__modifier'>
        {info.modifiers && info.modifiers.map(x => (
          <div key={x.ref}><PowerModifier info={x} showInfo={showInfo} /></div>
        ))}
      </div>
    </div>
  );
};

export default PowerQuality;
