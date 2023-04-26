import React from 'react';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import PowerModifier from './powermodfier';

interface PowerQualityProps {
  info: IPowerQuality;
  showInfo: (info: IPowerItem) => void
}

export function calculateCost(info: IPowerQuality) {
  const powerQualityBaseCost = (info.emulatedPower ? 0 : 2) + Math.max(0, info.cost * (info.multiplier-1));
  const modifierSumCost = info.modifiers ? info.modifiers.reduce((prev, cur) => prev + cur.cost * cur.multiplier, 0) : 0;
  return Math.max((info.emulatedPower ? 0 : 1), powerQualityBaseCost + modifierSumCost);
}

export function calculateCapacities(info: IPowerQuality): string[] {
  const state = {
    touchOnly: false,
    selfOnly: false,
    mass: false,
    range: false,
    speed: false,
    touch: false,
    self: false
  };

  const type = info.capacity.toLowerCase();
  if(type === 'mass') state.mass = true;
  else if(type === 'range') state.range = true;
  else if(type === 'speed') state.speed = true;
  else if(type === 'touch') state.touch = true;
  else if(type === 'self') state.self = true;
  
  for (const modifier of info.modifiers) {
    switch (modifier.name.toLowerCase()) {
      case 'touch only': state.touchOnly = true; break;
      case 'self only': state.selfOnly = true; break;
      case 'power capacity': 
        const type = modifier.specific?.toLowerCase();
        if(type === 'mass') state.mass = true;
        else if(type === 'range') state.range = true;
        else if(type === 'speed') state.speed = true;
        else if(type === 'touch') state.touch = true;
        break;
    }
  }

  if(state.selfOnly) return ['Self'];
  if(state.touchOnly) return ['Touch'];

  const capacities = [];
  if(state.mass) capacities.push('Mass');
  if(state.range) capacities.push('Range');
  if(state.speed) capacities.push('Speed');
  if(state.touch) capacities.push('Touch');
  if(state.self) capacities.push('Self');

  return capacities;
}

const PowerQuality: React.FC<PowerQualityProps> = ({ info, showInfo }) => {
  const cost = calculateCost(info);
  const capacities = calculateCapacities(info);
  return (
    <div className='powerquality'>
      <header className='powerquality__row'>
        <h2 className='powerquality__name' onClick={() => showInfo(info)}>{info.multiplier-1 > 0 ? `+${info.multiplier-1} ` : ''}{info.name}</h2>
        <small className="powerquality__cost">{`(${cost})`}</small>
      </header>
      <small>Capacities: {capacities.join(', ')}</small>
      <div className='powerquality__modifier'>
        {info.modifiers && info.modifiers.map(x => (
          <div key={x.ref}><PowerModifier info={x} showInfo={showInfo} /></div>
        ))}
      </div>
    </div>
  );
};

export default PowerQuality;
