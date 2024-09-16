import APIResponse from './models/APIResponse';
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

const fetchData = function (url: string): Promise<APIResponse> {
  return fetch(url).then(async (response: Response) => {
    return {
      status: response.status,
      ok: response.ok,
      data: await response.json()
    };
  });
};

export { getStatusColorCode, fetchData };
