import React from 'react';
import { Capacity } from '../capacitycalc';

interface ThreeCapacitiesProps {
  boosters: number; 
  massCapacity: Capacity;
  rangeCapacity: Capacity;
  speedCapacity: Capacity;
}

const ThreeCapacities: React.FC<ThreeCapacitiesProps> = ({ boosters, massCapacity, rangeCapacity, speedCapacity }) => {
  const headerRow = [];
  const header = [];
  const rows = [];
  const secondaryHeaderRow = [];
  for (let index = 0; index < boosters; index++) {
    headerRow.push(<th key={'headerItem'+index} colSpan={3}>Booster {index}</th>);
    secondaryHeaderRow.push(<React.Fragment key={index}><td>Mass</td><td>Range</td><td>Speed</td></React.Fragment>);
  }
  header.push(<tr key='mainHeaderRow'><th></th>{headerRow}</tr>);
  header.push(<tr key='secondaryHeaderRow'><th></th>{secondaryHeaderRow}</tr>);
  for (let rowIndex = 0; rowIndex < boosters; rowIndex++) {
    const rowContent = [];
    for (let colIndex = 0; colIndex < boosters; colIndex++) {
      if(rowIndex + colIndex >= boosters) rowContent.push(<React.Fragment key={rowIndex + 'x' + colIndex}><td></td><td></td><td></td></React.Fragment>);
      else rowContent.push(<React.Fragment key={rowIndex + 'x' + colIndex}>
        <td className='border-left border-color--primary'>{massCapacity.getValue() * Math.pow(10, rowIndex)} {massCapacity.getMeasure()}</td>
        <td>{rangeCapacity.getValue() * Math.pow(10, colIndex)} {massCapacity.getMeasure()}</td>
        <td>{speedCapacity.getValue() * Math.pow(10, boosters - rowIndex - colIndex - 1)} {massCapacity.getMeasure()}</td>
      </React.Fragment>);
    }
    rows.push(<tr key={'row'+rowIndex}><th>Booster {rowIndex}</th>{rowContent}</tr>);
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

export default ThreeCapacities;
