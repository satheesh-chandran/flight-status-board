import {
  cleanup,
  render,
  screen,
  fireEvent,
  act
} from '@testing-library/react';
import App from './App';
import sinon from 'sinon';
import Flight from './models/Flight';
import FlightStatus from './models/FlightStatus';

const flight1: Flight = {
  id: 1,
  flightNumber: 'A2B0',
  airline: 'Airline 1',
  origin: 'Origin 1',
  destination: 'Destination 1',
  departureTime: '2024-09-15T14:05:03.355Z',
  status: FlightStatus.Boarding
};

test('should render error widget in FlightViewPage on error and navigate to home page', async () => {
  const BASE_URL: string = 'http://localhost:8080';
  process.env.REACT_APP_API_BASE_URL = BASE_URL;

  const mockHttp = sinon.stub();

  mockHttp.withArgs(`${BASE_URL}/flights`).returns(
    Promise.resolve({
      status: 200,
      ok: true,
      data: [flight1]
    })
  );

  mockHttp.withArgs(`${BASE_URL}/flights/1`).returns(
    Promise.resolve({
      status: 404,
      ok: false,
      data: { error: 'Flight not found' }
    })
  );

  render(<App httpCall={mockHttp} />);

  const row1: HTMLElement = await screen.findByTestId('table-row1');

  expect(row1).toBeTruthy();

  await act(async () => {
    fireEvent.click(row1);
  });

  const linkElement = screen.getByText(/Home Page/);
  expect(linkElement).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(linkElement);
  });
  const firsRow: HTMLElement = await screen.findByTestId('table-row1');
  expect(firsRow).toBeInTheDocument();
});
