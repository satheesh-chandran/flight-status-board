import { Link } from 'react-router-dom';

const ErrorWidget = function () {
  return (
    <div id="error-widget">
      <h2>Error While Loading Flight</h2>
      <p>
        Could not load the data that you requested due to an unexpected error.
        Please refresh the page or go to <Link to="/flights">Home Page</Link>
      </p>
    </div>
  );
};

export default ErrorWidget;
