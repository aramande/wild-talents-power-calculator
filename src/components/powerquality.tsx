import React from 'react';
import { IPowerItem, IPowerQuality } from '../interfaces/power.interface';
import PowerModifier from './powermodfier';
import QualityHelper from '../helpers/Quality.helper';

interface PowerQualityProps {
  info: IPowerQuality;
  showInfo: (info: IPowerItem) => void
}



const PowerQuality: React.FC<PowerQualityProps> = ({ info, showInfo }) => {
  const cost = QualityHelper.calculateCost(info);
  const capacities = QualityHelper.getCapacities(info);
  return (
    <div className='powerquality'>
      <header className='powerquality__row'>
        <h2 className='powerquality__name' onClick={() => showInfo(info)}>{info.multiplier-1 > 0 ? `+${info.multiplier-1} ` : ''}{info.name}</h2>
        {info.specific && <span>({info.specific})</span>}
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
