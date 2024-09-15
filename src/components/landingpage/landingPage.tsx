import { useEffect, useState } from 'react';
import Flight from '../../models/Flight';
import ErrorWidget from '../ErrorWidget';
import { useNavigate } from 'react-router-dom';
import FlightRow from './FlightRow';

const FlightsLandingPage = function () {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [statusCode, setStatusCode] = useState<number>(200);

  const [apiCallTrigger, setTrigger] = useState<number>(0);
  console.log(process.env);
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/flights`;

    fetch(url)
      .then(async (response: Response) => {
        console.log(response);
        setStatusCode(response.status);
        if (response.ok) {
          const flightData: Flight[] = (await response.json()) as Flight[];
          setFlights(flightData);
        }
        setTimeout(() => {
          setTrigger(+new Date());
        }, 1000 * 10);
      })
      .catch(console.log);
  }, [apiCallTrigger]);

  if (flights.length !== 0) {
    return (
      <div className="flights-container">
        <table>
          <tbody>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure time</th>
              <th>Status</th>
            </tr>
            {flights.map((flight: Flight) => {
              return (
                <FlightRow
                  key={flight.id}
                  flight={flight}
                  navigate={navigate}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else if (statusCode >= 200 && statusCode < 300) {
    return <h2>Loading...</h2>;
  }
  return <ErrorWidget />;
};

export default FlightsLandingPage;
