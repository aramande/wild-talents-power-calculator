import React from 'react';
import { IPowerItem, IPowerModifier } from '../../interfaces/power.interface';
import style from './powermodifier.module.scss';

interface PowerModifierProps {
  info: IPowerItem;
  showInfo: (info: IPowerItem) => void;
}

const PowerModifier: React.FC<PowerModifierProps> = ({ info, showInfo }) => {
  function cost(info: IPowerItem) {
    return info.cost * info.multiplier;
  }
  const modifier = info as IPowerModifier;
  return (
    <div className={style.powermodifier}>
      <header className={style.header}>
        <strong className={style.name} onClick={() => showInfo(info)}>
          {info.multiplier > 1 ? `+${info.multiplier} ` : ''}
          {info.name}
        </strong>
        {modifier.specific?.length > 0 && <span className={style.specific}>({modifier.specific})</span>}
        <small className={style.cost}>{`(${cost(info)})`}</small>
      </header>
    </div>
  );
};

export default PowerModifier;
