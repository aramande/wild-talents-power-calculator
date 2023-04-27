import React from 'react';
import { Capacity } from '../capacitycalc';

interface TwoCapacitiesProps {
  boosters: number, 
  firstCapacity: Capacity,
  secondCapacity: Capacity
}

const TwoCapacities: React.FC<TwoCapacitiesProps> = ({ boosters, firstCapacity, secondCapacity }) => {
  const header = [];
  const rows = [];
  header.push(<tr key={'headerRow'}><th></th><td>{firstCapacity.getType()}</td><td>{secondCapacity.getType()}</td></tr>);
  for (let rowIndex = 0; rowIndex < boosters; rowIndex++) {
    rows.push(<tr key={'row'+rowIndex}><th>Booster {rowIndex}</th>
      <td className='border-left border-color--primary'>{firstCapacity.getValue() * Math.pow(10, rowIndex)} {firstCapacity.getMeasure()}</td>
      <td>{firstCapacity.getValue() * Math.pow(10, boosters - rowIndex - 1)} {secondCapacity.getMeasure()}</td>
    </tr>);
  }
  return (
    <table className='infobox__capacity-calculator'>
      <thead>
        {header}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default TwoCapacities;
