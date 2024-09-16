import { render, screen } from '@testing-library/react';
import ErrorWidget from './ErrorWidget';
import { BrowserRouter } from 'react-router-dom';

describe('Error Widget', () => {
  test('Should render error page', () => {
    render(
      <BrowserRouter>
        <ErrorWidget />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Home Page/);
    expect(linkElement).toBeInTheDocument();
  });
});
