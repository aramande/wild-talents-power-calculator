import React from 'react';
import { IPowerItem } from '../interfaces/power.interface';

interface PowerModifierProps {
  info: IPowerItem;
  showInfo: (info: IPowerItem) => void;
}

const PowerModifier: React.FC<PowerModifierProps> = ({info, showInfo}) => {
  function cost(info: IPowerItem) {
    return info.cost * (info.multiplier);
  }
  return (
    <div className='powermodifier'>
      <header className='powermodifier__header'>
        <strong className='powermodifier__name' onClick={() => showInfo(info)}>{info.multiplier > 1 ? `+${info.multiplier} ` : ''}{info.name}</strong> 
        {info.specific && (<span className='powermodifier__specific'>({info.specific})</span>)}
        <small className="powermodifier__cost">{`(${cost(info)})`}</small>
      </header>
    </div>
  );
};

export default PowerModifier;
