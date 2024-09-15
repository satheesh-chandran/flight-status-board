import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import FlightsLandingPage from './components/landingpage/landingPage';
import FlightViewPage from './components/flightviewpage/FlightViewPage';
import Header from './components/Header';

const App = function () {
  return (
    <div className="container">
      <Header />
      <div className="content-view">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/flights" element={<FlightsLandingPage />} />
            <Route path="/flights/:id" element={<FlightViewPage />} />
            <Route path="*" element={<Navigate to="/flights" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
