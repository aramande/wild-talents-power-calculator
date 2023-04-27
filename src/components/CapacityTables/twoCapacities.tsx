import React from 'react';
import { Capacity } from '../capacitycalc';

interface TwoCapacitiesProps {
  reduced: number;
  boosters: number; 
  firstCapacity: Capacity;
  secondCapacity: Capacity;
  offCapacity: Capacity;
}

const TwoCapacities: React.FC<TwoCapacitiesProps> = ({ reduced, boosters, firstCapacity, secondCapacity, offCapacity }) => {
  const header = [];
  const rows = [];
  header.push(<tr key={'headerRow'}><th></th><td>{firstCapacity.getType()}</td><td>{secondCapacity.getType()}</td>{offCapacity.isMaxed() && <td>{offCapacity.getType()}</td>}</tr>);
  for (let rowIndex = 0; rowIndex <= boosters; rowIndex++) {
    rows.push(<tr key={'row'+rowIndex}><th>Booster {rowIndex}</th>
      <td className='border-left border-color--primary'>{firstCapacity.getValue() * Math.pow(10, rowIndex) * Math.pow(10, -reduced)} {firstCapacity.getMeasure()}</td>
      <td>{secondCapacity.getValue() * Math.pow(10, boosters - rowIndex) * Math.pow(10, -reduced)} {secondCapacity.getMeasure()}</td>
      {offCapacity.isMaxed() && <td>{offCapacity.getValue() * Math.pow(10, boosters) * Math.pow(10, -reduced)} {offCapacity.getMeasure()}</td>}
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
