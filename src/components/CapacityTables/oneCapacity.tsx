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
  header.push(<tr key='header' className='border-bottom border-color--primary border-bottom--thick'>
    <td>{capacity.getType()}</td>
  </tr>);
  rows.push(<tr key='row'>
    <td>{capacity.getValue() * Math.pow(10, boosters) * Math.pow(10, -reduced)} {capacity.getMeasure()}</td>
  </tr>);
  
  return (
    <>
    <table className='infobox__capacity-calculator'>
      <thead>
        {header}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    {capacity.getType() === 'Speed' && <small>ypr indicates yards per round</small>}
    </>
  );
}

export default OneCapacity;