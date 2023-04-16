import React from 'react';
import { IPowerItemInfo, IPowerQualityInfo } from '../interfaces/power.interface';
import PowerModifier from './powermodfier';

interface PowerQualityProps {
  info: IPowerQualityInfo;
  showInfo: (info: IPowerItemInfo) => void
}

const PowerQuality: React.FC<PowerQualityProps> = ({ info, showInfo }) => {
  function calculateCost(level: number, modifiers: IPowerItemInfo[]) {
    const powerQualityBaseCost = 2 + Math.max(0, level);
    const modifierSumCost = modifiers.reduce((prev, cur) => prev + (cur.cost ?? cur.dynamicCost?.(cur.level) ?? 0), 0);
    return Math.max(1, powerQualityBaseCost + modifierSumCost);
  }

  const cost = calculateCost(info.level, info.modifiers ?? [])

  return (
    <>
      <header className='powerquality'>
        <h2 className='powerquality__name' onClick={() => showInfo(info)}>{info.level > 0 ? `+${info.level} ` : ''}{info.name}</h2>
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
