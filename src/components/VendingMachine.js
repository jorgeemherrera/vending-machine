import React, { useState } from 'react';
import MoneyInput from './MoneyInput';
import Item from './Item';
import './VendingMachine.scss';
import { availableItemsData } from './../Data/AvailableItems';
import { availableChangeData } from './../Data/availableChange';

const initializeState = () => {
    return {
        availableItems: { ...availableItemsData },
        availableChange: { ...availableChangeData },
        insertedMoney: 0,
    };
};
const VendingMachine = () => {

    const [vendingMachineState, setVendingMachineState] = useState(
        initializeState()
    );

    const [insertedMoney, setInsertedMoney] = useState(0);

    const insertMoney = (amount) => {
        setInsertedMoney((prevMoney) => prevMoney + amount);
    };

    const returnCoins = () => {
        setInsertedMoney(0);
    };

    const selectItem = (itemName) => {
        const item = availableItemsData[itemName];
        if (item && item.count > 0 && insertedMoney >= item.price) {
            const change = insertedMoney - item.price;

            // Update state using functional updates for better concurrency control
            setVendingMachineState((prevItems) => ({
                ...prevItems,
                [itemName]: { ...item, count: item.count - 1 },
            }));
            setVendingMachineState((prevChange) => ({
                ...prevChange,
                [insertedMoney]: prevChange[insertedMoney] + 1,
            }));
            setInsertedMoney(change);

            return `GET-${itemName.toUpperCase()}`;
        } else {
            return "INSUFFICIENT FUNDS";
        }
    };

    return (
        <div className="vending-machine">
            <div>
                <p>Available Items:</p>
                <ul>
                    {Object.entries(availableItemsData).map(([itemName, item]) => (
                        <Item
                            key={itemName}
                            name={itemName}
                            price={item.price}
                            count={item.count}
                            onSelect={() => selectItem(itemName)}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <p>Inserted Money: ${insertedMoney.toFixed(2)}</p>
                <MoneyInput amount={0.05} onInsert={insertMoney} />
                <MoneyInput amount={0.10} onInsert={insertMoney} />
                <MoneyInput amount={0.25} onInsert={insertMoney} />
                <MoneyInput amount={1} onInsert={insertMoney} />
                <button onClick={returnCoins}>Return Coin</button>
            </div>
        </div>
    );
};

export default VendingMachine;