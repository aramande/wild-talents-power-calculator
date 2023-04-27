import { Capacity } from '../capacitycalc';

interface OneCapacityProps {
  capacity: Capacity;
  boosters: number;
}
const OneCapacity: React.FC<OneCapacityProps> = ({capacity, boosters}) => {
  const header = [];
  const rows = [];
  header.push(<tr key='header'><th></th><td>{capacity.getType()}</td></tr>);
  rows.push(<tr key='row'><th>Booster {boosters}</th><td>{capacity.getValue() * Math.pow(10, boosters)} {capacity.getMeasure()}</td></tr>);
  
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