import React, { useState } from 'react';
import MoneyInput from './MoneyInput';
import Item from './Item';
import './VendingMachine.scss';
const VendingMachine = () => {
  const [availableItems, setAvailableItems] = useState({
    water: { count: 10, price: 0.65 },
    juice: { count: 10, price: 1.00 },
    soda: { count: 10, price: 1.50 },
  });
  const [availableChange, setAvailableChange] = useState({
    0.05: 100,
    0.10: 100,
    0.25: 100,
    1: 100,
  });
  const [insertedMoney, setInsertedMoney] = useState(0);

  const insertMoney = (amount) => {
    setInsertedMoney((prevMoney) => prevMoney + amount);
  };

  const returnCoins = () => {
    setInsertedMoney(0);
  };

  const selectItem = (itemName) => {
    const item = availableItems[itemName];
    if (item && item.count > 0 && insertedMoney >= item.price) {
      const change = insertedMoney - item.price;

      // Update state using functional updates for better concurrency control
      setAvailableItems((prevItems) => ({
        ...prevItems,
        [itemName]: { ...item, count: item.count - 1 },
      }));
      setAvailableChange((prevChange) => ({
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
          {Object.entries(availableItems).map(([itemName, item]) => (
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