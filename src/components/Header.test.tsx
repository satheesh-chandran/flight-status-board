import { render, screen } from '@testing-library/react';
// import { act } from 'react';

import Header from './Header';

describe('Header', () => {
  test('Should render Header', async () => {
    render(<Header />);
    const heading = screen.getByText(/FLIGHT STATUS/);
    expect(heading).toBeInTheDocument();
  });
});
