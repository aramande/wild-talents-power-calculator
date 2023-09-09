import React from 'react';
import { IPowerItem, IPowerQuality } from '../../interfaces/power.interface';
import PowerModifier from '../PowerModifier/powermodfier';
import QualityHelper from '../../helpers/Quality.helper';
import style from './powerquality.module.scss';

interface PowerQualityProps {
  info: IPowerQuality;
  showInfo: (info: IPowerItem) => void;
}

const PowerQuality: React.FC<PowerQualityProps> = ({ info, showInfo }) => {
  const cost = QualityHelper.calculateCost(info);
  const capacities = QualityHelper.getCapacities(info);
  return (
    <div className={style.powerquality}>
      <header className={style.row}>
        <h2 className={style.name} onClick={() => showInfo(info)}>
          {info.multiplier - 1 > 0 ? `+${info.multiplier - 1} ` : ''}
          {info.name}
        </h2>
        {info.specific?.length > 0 && <span>({info.specific})</span>}
        <small>{`(${cost})`}</small>
      </header>
      <small>Capacities: {capacities.join(', ')}</small>
      <div>
        {info.modifiers &&
          info.modifiers.map((x) => (
            <div key={x.ref}>
              <PowerModifier info={x} showInfo={showInfo} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PowerQuality;
