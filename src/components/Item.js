
const Item = ({ name, price, count, onSelect }) => (
  <li>
    {name}: ${price} ({count} available)
    <button onClick={onSelect}>Select</button>
  </li>
);

export default Item;