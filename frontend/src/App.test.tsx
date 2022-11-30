import React from 'react';
import { render, screen } from '@testing-library/react';
import AppCheck from './AppCheck';

test('renders learn react link', () => {
  render(<AppCheck />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
