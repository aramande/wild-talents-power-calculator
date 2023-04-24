import React from 'react';
import { IPowerItem, IPowerModifier } from '../interfaces/power.interface';
import { getDescription } from '../helpers/get-description';
import ReactMarkdown from 'react-markdown';


interface InfoBoxProps {
  info?: IPowerItem;
}

const InfoBox: React.FC<InfoBoxProps> = ({info}) => {
  if(!info) return <></>;
  const description = getDescription(info.name);
  const modifier = info as IPowerModifier;
  return (
    <div className='infobox'>
      <h1 className='infobox__name'>{info.name}</h1>
      {modifier.specific && (<span className='infobox__specific'>{modifier.specific}</span>)}
      <div className='infobox__scrollbox'>
        <div>
          {description.map((x, i) => (<ReactMarkdown key={i}>{x}</ReactMarkdown>))}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
