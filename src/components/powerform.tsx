import React from 'react';
import { IPowerItemInfo } from './infobox';
import PowerQuality from './powerquality';

interface PowerFormProps {
  showInfo: (info: IPowerItemInfo) => void
}

export interface IPowerQualityInfo extends IPowerItemInfo{
  modifiers?: IPowerItemInfo[];
}

const PowerForm: React.FC<PowerFormProps> = (props: PowerFormProps) => {
  const powerQuality: IPowerQualityInfo[] = [
    {ref: 1, name: 'Attack', level: 1, cost: (level) => 1 + level}
  ];
  return (
    <section className='powerform'>
      <header>
        <h1><input  className="powerform__namefield" /></h1>
      </header>
      {powerQuality.map(x => (
        <PowerQuality key={x.ref} info={x}></PowerQuality>
      ))}
      <footer></footer>
    </section>
  );

};

export default PowerForm;
