import React from 'react';
import { IPowerQualityInfo } from './powerform';

interface PowerQualityProps {
  info: IPowerQualityInfo;
}

const PowerQuality: React.FC<PowerQualityProps> = ({ info }) => {
  const cost = info.cost(info.level) ?? 1;

  return (
    <article className='powerquality'>
      <h2 className='powerquality__name'>{info.name}</h2>
      <small className="powerquality__cost">{`(${cost}/${cost*2}/${cost*4})`}</small>
    </article>
  );
};

export default PowerQuality;
