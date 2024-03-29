import React from 'react';
import { Capacity } from './capacitycalc';
import style from './capacitycalc.module.scss';

interface TwoCapacitiesProps {
  reduced: number;
  boosters: number;
  firstCapacity: Capacity;
  secondCapacity: Capacity;
  offCapacity: Capacity;
}

const TwoCapacities: React.FC<TwoCapacitiesProps> = ({
  reduced,
  boosters,
  firstCapacity,
  secondCapacity,
  offCapacity,
}) => {
  const header = [];
  const rows = [];
  header.push(
    <tr key={'headerRow'} className={style.headerRow}>
      <td>{firstCapacity.getType()}</td>
      <td>{secondCapacity.getType()}</td>
      {offCapacity.isMaxed() && <td>{offCapacity.getType()}</td>}
    </tr>
  );
  for (let rowIndex = 0; rowIndex <= boosters; rowIndex++) {
    rows.push(
      <tr key={'row' + rowIndex} className={style.row}>
        <td className={style.cell}>
          {firstCapacity.getValue() * Math.pow(10, rowIndex) * Math.pow(10, -reduced)} {firstCapacity.getMeasure()}
        </td>
        <td className={style.cell}>
          {secondCapacity.getValue() * Math.pow(10, boosters - rowIndex) * Math.pow(10, -reduced)}{' '}
          {secondCapacity.getMeasure()}
        </td>
      </tr>
    );
  }
  return (
    <>
      <table className={style.calculator}>
        <thead>{header}</thead>
        <tbody>{rows}</tbody>
      </table>

      {offCapacity.getType() !== 'Speed' && <small>ypr indicates yards per round</small>}
    </>
  );
};

export default TwoCapacities;
