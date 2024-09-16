import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import FlightsLandingPage from './components/landingpage/landingPage';
import FlightViewPage from './components/flightviewpage/FlightViewPage';
import Header from './components/Header';
import APIResponse from './models/APIResponse';

const App = function ({
  httpCall
}: {
  httpCall: (url: string) => Promise<APIResponse>;
}) {
  return (
    <div className="container">
      <Header />
      <div className="content-view">
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/flights"
              element={<FlightsLandingPage httpCall={httpCall} />}
            />
            <Route
              path="/flights/:id"
              element={<FlightViewPage httpCall={httpCall} />}
            />
            <Route path="*" element={<Navigate to="/flights" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
