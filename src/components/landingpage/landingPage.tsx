import { useEffect, useState } from 'react';
import Flight from '../../models/Flight';
import ErrorWidget from '../ErrorWidget';
import { useNavigate } from 'react-router-dom';
import FlightRow from './FlightRow';
import { fetchData } from '../../utility';
import APIResponse from '../../models/APIResponse';

const FlightsLandingPage = function ({
  httpCall
}: {
  httpCall: (url: string) => Promise<APIResponse>;
}) {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [statusCode, setStatusCode] = useState<number>(200);

  const [apiCallTrigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/flights`;

    httpCall(url)
      .then((response: APIResponse) => {
        setStatusCode(response.status);
        if (response.ok) {
          const flightData: Flight[] = response.data as Flight[];
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
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="flights-table">
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
