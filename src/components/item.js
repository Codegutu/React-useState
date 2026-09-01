const Item = function ({ item, onDeleteItems, onToggleItem }) {
  return (
    <>
      <li key={item.id}>
        <input
          type="checkbox"
          value={item.checked}
          onChange={() => onToggleItem(item.id)}
        />
        <span
          style={item.packed ? { textDecoration: "line-through" } : {}}
          key={item.id}
        >
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItems(item.id)}>❌</button>
      </li>
    </>
  );
};

export default Item;
