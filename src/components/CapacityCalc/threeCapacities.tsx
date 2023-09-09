import React from 'react';
import { Capacity } from './capacitycalc';
import style from './capacitycalc.module.scss';

interface ThreeCapacitiesProps {
  reduced: number;
  boosters: number;
  massCapacity: Capacity;
  rangeCapacity: Capacity;
  speedCapacity: Capacity;
}

const ThreeCapacities: React.FC<ThreeCapacitiesProps> = ({
  boosters,
  reduced,
  massCapacity,
  rangeCapacity,
  speedCapacity,
}) => {
  const headerRow = [];
  const header = [];
  const rows = [];
  for (let index = 0; index <= boosters; index++) {
    if (index === 0) {
      headerRow.push(
        <th key={'headerItem' + index} className={style.cellBorder} colSpan={3}>
          {rangeCapacity.getType()}
        </th>
      );
    } else {
      headerRow.push(
        <th key={'headerItem' + index} className={`${style.cell} ${style.cellBorder}`} colSpan={3}>
          {index}
        </th>
      );
    }
  }
  header.push(
    <tr key="mainHeaderRow" className={style.headerRow}>
      <th></th>
      {headerRow}
    </tr>
  );
  for (let rowIndex = 0; rowIndex <= boosters; rowIndex++) {
    const rowContent = [];
    for (let colIndex = 0; colIndex <= boosters; colIndex++) {
      if (rowIndex + colIndex > boosters)
        rowContent.push(
          <React.Fragment key={rowIndex + 'x' + colIndex}>
            <td></td>
            <td></td>
            <td></td>
          </React.Fragment>
        );
      else
        rowContent.push(
          <React.Fragment key={rowIndex + 'x' + colIndex}>
            <td className={`${style.cell} ${style.cellBorder}`}>
              {massCapacity.getValue() * Math.pow(10, rowIndex) * Math.pow(10, -reduced)} {massCapacity.getMeasure()}
            </td>
            <td className={style.cell}>
              {rangeCapacity.getValue() * Math.pow(10, colIndex) * Math.pow(10, -reduced)} {rangeCapacity.getMeasure()}
            </td>
            <td className={`${style.cell}`}>
              {speedCapacity.getValue() * Math.pow(10, boosters - rowIndex - colIndex) * Math.pow(10, -reduced)}{' '}
              {speedCapacity.getMeasure()}
            </td>
          </React.Fragment>
        );
    }
    if (rowIndex === 0) {
      rows.push(
        <tr key={'row' + rowIndex} className={style.row}>
          <th className={style.headerCol}>{massCapacity.getType()}</th>
          {rowContent}
        </tr>
      );
    } else {
      rows.push(
        <tr key={'row' + rowIndex} className={style.row}>
          <th className={style.headerCol}>{rowIndex}</th>
          {rowContent}
        </tr>
      );
    }
  }
  return (
    <>
      <table className={style.calculator}>
        <thead>{header}</thead>
        <tbody>{rows}</tbody>
      </table>
      <small>ypr indicates yards per round</small>
    </>
  );
};

export default ThreeCapacities;
