import { act } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

import Flight from './models/Flight';
import FlightStatus from './models/FlightStatus';

import sinon from 'sinon';

const flight1: Flight = {
  id: 1,
  flightNumber: 'A2B0',
  airline: 'Airline 1',
  origin: 'Origin 1',
  destination: 'Destination 1',
  departureTime: '2024-09-15T14:05:03.355Z',
  status: FlightStatus.Boarding
};

const flight2: Flight = {
  id: 2,
  flightNumber: 'A3B65',
  airline: 'Airline 2',
  origin: 'Origin 2',
  destination: 'Destination 2',
  departureTime: '2024-09-15T14:21:43.355Z',
  status: FlightStatus.Departed
};

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  sinon.restore();
});

test('Should render home page and go to Flight View page on click', async () => {
  const BASE_URL: string = 'http://localhost:8080';
  process.env.REACT_APP_API_BASE_URL = BASE_URL;
  cleanup();
  const mockHttp = sinon.stub();
  mockHttp.withArgs(`${BASE_URL}/flights`).returns(
    Promise.resolve({
      status: 200,
      ok: true,
      data: [flight1, flight2]
    })
  );

  mockHttp.withArgs(`${BASE_URL}/flights/1`).returns(
    Promise.resolve({
      status: 200,
      ok: true,
      data: flight1
    })
  );

  render(<App httpCall={mockHttp} />);

  const row1: HTMLElement = await screen.findByTestId('table-row1');
  const row2: HTMLElement = await screen.findByTestId('table-row2');

  expect(row1).toBeInTheDocument();
  expect(row2).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(row1);
  });

  expect(screen.getByText(/Departure :/)).toBeInTheDocument();
});
