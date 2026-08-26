import { useState } from "react";

//Initial Items Array
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "water", quantity: 3, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(items.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} onDeleteItems={handleDeleteItem} />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return <h1>Packing List</h1>;
};

const Form = function ({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, id: Date.now(), packed: false };
    if (!description) return;
    console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        className="hide-scrollbar"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item... "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul className="hide-scrollbar">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have x items on your list, and you have already packed (x%)</em>
    </footer>
  );
}

const Item = function ({ item, onDeleteItems }) {
  return (
    <>
      <li key={item.id}>
        <span
          style={item.packed ? { textDecoration: "line-through" } : {}}
          key={item.id}
        >
          {item.quantity} {item.description}
        </span>
        <button onClick={(item) => onDeleteItems(item.id)}>❌</button>
      </li>
    </>
  );
};
