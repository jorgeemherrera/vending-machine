import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../components/item';

test('renders item details correctly', () => {
  const item = { name: 'Water', price: 0.65, count: 5 };
  render(<Item {...item} onSelect={() => {}} />);
  const itemDetails = screen.getByText(/water: \$0.65 \(5 available\)/i);
  expect(itemDetails).toBeInTheDocument();
});

test('calls onSelect when "Select" button is clicked', () => {
  const onSelectMock = jest.fn();
  const item = { name: 'Juice', price: 1.00, count: 10 };
  render(<Item {...item} onSelect={onSelectMock} />);
  const selectButton = screen.getByText('Select');
  fireEvent.click(selectButton);
  expect(onSelectMock).toHaveBeenCalled();
});
