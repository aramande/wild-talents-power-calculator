import React from 'react';
import { IPowerItemInfo } from '../interfaces/power.interface';

interface PowerModifierProps {
  info: IPowerItemInfo;
  showInfo: (info: IPowerItemInfo) => void;
}

const PowerModifier: React.FC<PowerModifierProps> = ({info, showInfo}) => {
  function cost(info: IPowerItemInfo) {
    return info.cost ?? info.dynamicCost?.(info.level) ?? 0;
  }
  return (
    <div className='powermodifier'>
      <header className='powermodifier__header'>
        <strong className='powermodifier__name' onClick={() => showInfo(info)}>{info.level > 0 ? `+${info.level + 1} ` : ''}{info.name}</strong> 
        {info.specific && (<span className='powermodifier__specific'>({info.specific})</span>)}
        <small className="powermodifier__cost">{`(${cost(info)})`}</small>
      </header>
    </div>
  );
};

export default PowerModifier;
