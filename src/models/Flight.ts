import FlightStatus from './FlightStatus';

interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: FlightStatus;
}

export default Flight;
