import Flight from '../../models/Flight';
import { getStatusColorCode } from '../../utility';

const FlightWidget = function ({ flight }: { flight: Flight }) {
  const departureTime = new Date(flight.departureTime);
  return (
    <div className="flight-detail">
      <h2>
        <span>{flight.flightNumber}</span> {flight.airline}
      </h2>
      <h3>
        {`${flight.origin}    `}
        <span>To</span>
        {`    ${flight.destination}`}
      </h3>
      <h2>Departure : {departureTime.toLocaleDateString()}</h2>
      <h2>Time : {departureTime.toLocaleTimeString()}</h2>
      <h4 style={{ color: getStatusColorCode(flight.status), fontSize: 25 }}>
        {flight.status}
      </h4>
    </div>
  );
};

export default FlightWidget;
