import { render, screen } from '@testing-library/react';
import Flight from '../../models/Flight';
import FlightStatus from '../../models/FlightStatus';
import FlightWidget from './FlightWidget';

describe('Flight Widget', () => {
  test('Should render the Given Flight details inside the widget', () => {
    const flight: Flight = {
      id: 2,
      flightNumber: 'A2B0',
      airline: 'Airline 2',
      origin: 'Origin 2',
      destination: 'Destination 2',
      departureTime: '2024-09-15T14:05:03.355Z',
      status: FlightStatus.Boarding
    };
    render(<FlightWidget flight={flight} />);

    expect(screen.getByText(/A2B0/)).toBeInTheDocument();
    expect(screen.getByText(/Airline 2/)).toBeInTheDocument();
    expect(screen.getByText(/Departure : /)).toBeInTheDocument();
  });
});
