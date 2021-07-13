import { render, screen } from '@testing-library/react';
import App from '../../App';

it('should render headers element', () => {
  render(<App />);
  const headerElement = screen.getByText(/Breaking Bad Characters/i);
  expect(headerElement).toBeInTheDocument();
});

it('should render dropdown button element', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
