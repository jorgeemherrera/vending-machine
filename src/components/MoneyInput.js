const MoneyInput = ({ amount, onInsert }) => (
    <button onClick={() => onInsert(amount)}>Insert ${amount}</button>
);

export default MoneyInput;