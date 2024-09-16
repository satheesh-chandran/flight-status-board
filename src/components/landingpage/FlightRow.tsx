import Flight from '../../models/Flight';
import { getStatusColorCode } from '../../utility';

const FlightRow = function ({
  flight,
  navigate
}: {
  flight: Flight;
  navigate: (toUrl: string) => void;
}) {
  return (
    <tr
      data-testid={`table-row${flight.id}`}
      onClick={() => navigate(`/flights/${flight.id}`)}
    >
      <td>{flight.flightNumber}</td>
      <td>{flight.airline}</td>
      <td>{flight.origin}</td>
      <td>{flight.destination}</td>
      <td>{new Date(flight.departureTime).toLocaleString()}</td>
      <td style={{ color: getStatusColorCode(flight.status) }}>
        {flight.status}
      </td>
    </tr>
  );
};

export default FlightRow;
