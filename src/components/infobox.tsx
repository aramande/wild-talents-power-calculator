import React from 'react';
import { IPowerItem, IPowerModifier, IPowerQuality } from '../interfaces/power.interface';
import { getDescription } from '../helpers/get-description';
import ReactMarkdown from 'react-markdown';
import CapacityCalc from './capacitycalc';


interface InfoBoxProps {
  info?: IPowerItem;
}

const InfoBox: React.FC<InfoBoxProps> = ({info}) => {
  if(!info) return <></>;
  const description = getDescription(info.name);
  const quality = info as IPowerQuality;
  if(quality){
    
  }
  return (
    <div className='infobox'>
      <h1 className='infobox__name'>{info.name}</h1>
      <span className='infobox__specific'>{info.specific}</span>
      <div className='infobox__scrollbox'>
        <div>
          {quality.modifiers && <CapacityCalc quality={quality}/>}
          {description.map((x, i) => (<ReactMarkdown key={i}>{x}</ReactMarkdown>))}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
