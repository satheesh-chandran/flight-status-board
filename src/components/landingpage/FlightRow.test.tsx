import { render, screen, fireEvent } from '@testing-library/react';
import FlightRow from './FlightRow';
import Flight from '../../models/Flight';
import FlightStatus from '../../models/FlightStatus';

describe('Flight row', () => {
  test('should render flight details in a table row', () => {
    const flight: Flight = {
      id: 2,
      flightNumber: 'A2B0',
      airline: 'Airline 2',
      origin: 'Origin 2',
      destination: 'Destination 2',
      departureTime: '2024-09-15T14:05:03.355Z',
      status: FlightStatus.Boarding
    };
    const navigate = jest.fn();
    render(
      <div>
        <FlightRow flight={flight} navigate={navigate} />
      </div>
    );
    expect(screen.getByText(/A2B0/)).toBeInTheDocument();
    expect(screen.getByText(/Airline 2/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('A2B0'));

    expect(navigate).toBeCalledWith('/flights/2');
  });
});
