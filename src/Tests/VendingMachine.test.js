import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VendingMachine from '../components/VendingMachine';

test('renders initial inserted money as $0.00', () => {
  render(<VendingMachine />);
  const insertedMoneyElement = screen.getByText(/inserted money/i);
  expect(insertedMoneyElement).toHaveTextContent(/\$0\.00/i);
});

test('inserts $0.25 when "Insert $0.25" button is clicked', () => {
  render(<VendingMachine />);
  const insertButton = screen.getByText('Insert $0.25');
  fireEvent.click(insertButton);
  const insertedMoneyElement = screen.getByText(/inserted money/i);
  expect(insertedMoneyElement).toHaveTextContent('$0.25');
});
