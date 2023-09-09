import React from 'react';
import { IPowerItem, IPowerQuality } from '../../interfaces/power.interface';
import { getDescription } from '../../helpers/get-description';
import ReactMarkdown from 'react-markdown';
import CapacityCalc from '../CapacityCalc/capacitycalc';

import styles from './infobox.module.scss';

interface InfoBoxProps {
  info?: IPowerItem;
}

const InfoBox: React.FC<InfoBoxProps> = ({ info }) => {
  if (!info) return <></>;
  const description = getDescription(info.name);
  const quality = info as IPowerQuality;
  return (
    <div className={styles.infobox}>
      <h1 className={styles.name}>{info.name}</h1>
      <span className={styles.specific}>{info.specific}</span>
      <div className={styles.scrollbox}>
        <div>
          {quality.modifiers && <CapacityCalc quality={quality} />}
          {description.map((x, i) => (
            <ReactMarkdown key={i}>{x}</ReactMarkdown>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
