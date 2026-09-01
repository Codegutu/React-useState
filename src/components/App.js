import { useState } from "react";
import Logo from "./Logo";
import Form from "./form";
import PackingList from "./packinglist";

//Initial Items Array
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "water", quantity: 3, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  function handleClearItems() {
    const confirm = window.confirm(
      "Do you wish to clear your entire packing list?",
    );

    if (confirm) setItems((items) => (items = []));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return <em className="stats">Add items to your packing list</em>;

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>All items packed. We're good to go. Woohoo! </em>
      ) : (
        <em>{`You have ${numItems} items on your list, and you have already packed ${packedItems} (${percentage}%)`}</em>
      )}
    </footer>
  );
}
