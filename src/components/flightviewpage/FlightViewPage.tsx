import { useEffect, useState } from 'react';
import Flight from '../../models/Flight';
import ErrorWidget from '../ErrorWidget';
import { useParams } from 'react-router-dom';
import FlightWidget from './FlightWidget';
import APIResponse from '../../models/APIResponse';

const FlightViewPage = function ({
  httpCall
}: {
  httpCall: (url: string) => Promise<APIResponse>;
}) {
  const { id } = useParams();
  const [flight, setFlight] = useState<Flight>();
  const [statusCode, setStatusCode] = useState<number>(200);

  const [apiCallTrigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/flights/${id}`;
    httpCall(url)
      .then((response: APIResponse) => {
        setStatusCode(response.status);
        if (response.ok) {
          const flightData: Flight = response.data as Flight;
          setFlight(flightData);
        } else {
          setFlight(undefined);
        }
        setTimeout(() => {
          setTrigger(+new Date());
        }, 1000 * 10);
      })
      .catch(console.log);
  }, [id, apiCallTrigger]);

  if (flight) {
    return <FlightWidget flight={flight} />;
  } else if (statusCode >= 200 && statusCode < 300) {
    return <h2>Loading...</h2>;
  }
  return <ErrorWidget />;
};

export default FlightViewPage;
