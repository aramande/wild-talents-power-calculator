import { Capacity } from '../capacitycalc';

interface OneCapacityProps {
  capacity: Capacity;
  offCapacity: Capacity;
  offCapacity2: Capacity;
  boosters: number;
  reduced: number;
}
const OneCapacity: React.FC<OneCapacityProps> = ({capacity, boosters, reduced, offCapacity, offCapacity2}) => {
  const header = [];
  const rows = [];
  header.push(<tr key='header'>
    <th></th>
    <td>{capacity.getType()}</td>
    {offCapacity.isMaxed() && <td>{offCapacity.getType()}</td>}
    {offCapacity2.isMaxed() && <td>{offCapacity2.getType()}</td>}
  </tr>);
  rows.push(<tr key='row'>
    <th>Booster {boosters}</th>
    <td>{capacity.getValue() * Math.pow(10, boosters) * Math.pow(10, -reduced)} {capacity.getMeasure()}</td>
    {offCapacity.isMaxed() && <td>{offCapacity.getValue() * Math.pow(10, boosters) * Math.pow(10, -reduced)} {offCapacity.getMeasure()}</td>}
    {offCapacity2.isMaxed() && <td>{offCapacity2.getValue() * Math.pow(10, boosters) * Math.pow(10, -reduced)} {offCapacity2.getMeasure()}</td>}
  </tr>);
  
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
}

export default OneCapacity;