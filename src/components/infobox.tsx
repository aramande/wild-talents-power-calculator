import React from 'react';
import { IPowerItem } from '../interfaces/power.interface';
import { getDescription } from '../helpers/get-description';
import ReactMarkdown from 'react-markdown';


interface InfoBoxProps {
  info?: IPowerItem;
}

const InfoBox: React.FC<InfoBoxProps> = ({info}) => {
  if(!info) return <></>;
  const description = getDescription(info.name);
  return (
    <div className='infobox'>
      <h1 className='infobox__name'>{info.name}</h1>
      {info.specific && (<span className='infobox__specific'>{info.specific}</span>)}
      <div className='infobox__scrollbox'>
        <div>
          {description.map((x, i) => (<p key={i}><ReactMarkdown>{x}</ReactMarkdown></p>))}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
