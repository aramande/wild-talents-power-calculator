import React from 'react';
import PowerForm from './powerform';

export interface IPowerItemInfo{
  ref: number;
  name?: string;
  level: number;
  cost: (level: number) => number;
  description?: string;
  content?: JSX.Element;
}
interface InfoBoxProps {
  info?: IPowerItemInfo;
}

const InfoBox: React.FC<InfoBoxProps> = ({info}) => {
  if(!info) return <></>;
  return (
    <>
      <h1>{info.name}</h1>
      <p>{info.description}</p>
      <div>{info.content}</div>
    </>
  );
};

export default InfoBox;
