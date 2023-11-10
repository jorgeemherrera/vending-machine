import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoneyInput from '../components/MoneyInput';


test('renders correct money $0.25 input button', () => {
    const onInsertMock = jest.fn();
    const amount = 0.25;
    render(<MoneyInput amount={amount} onInsert={onInsertMock} />);
    const moneyButton = screen.getByText(/insert \$0.25/i);
    expect(moneyButton).toBeInTheDocument();
});

test('calls onInsert when money $0.05 input button is clicked', () => {
    const onInsertMock = jest.fn();
    const amount = 0.05;
    render(<MoneyInput amount={amount} onInsert={onInsertMock} />);
    const moneyButton = screen.getByText(/insert \$0.05/i);
    fireEvent.click(moneyButton);
    expect(onInsertMock).toHaveBeenCalledWith(amount);
});

test('calls onInsert when money $1 input button is clicked', () => {
    const onInsertMock = jest.fn();
    const amount = 1;
    render(<MoneyInput amount={amount} onInsert={onInsertMock} />);
    const moneyButton = screen.getByText(/insert \$1/i);
    fireEvent.click(moneyButton);
    expect(onInsertMock).toHaveBeenCalledWith(amount);
});
