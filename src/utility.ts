import FlightStatus from './models/FlightStatus';

const getStatusColorCode = (status: FlightStatus) => {
  switch (status) {
    case FlightStatus.Delayed:
      return 'brown';
    case FlightStatus.Departed:
      return 'darkgreen';
    default:
      return 'forestgreen';
  }
};

export { getStatusColorCode };
