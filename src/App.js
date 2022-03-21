import { useEffect, useState } from "react";
import "./styles.css";

function Item({ children, onClick }) {
  const [state, setState] = useState("new");

  useEffect(() => {
    setTimeout(() => {
      setState("old");
    }, 1 * 1000);
  }, []);

  useEffect(() => {
    setState("new");

    setTimeout(() => {
      setState("old");
    }, 1 * 1000);
  }, [children]);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: state === "new" ? "yellow" : "white",
        transition: "all .5s ease-in-out"
      }}
    >
      {children} [click to delete]
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="App">
      <h1>Why using the array index as key prop is a bad practice</h1>
      <p>Yellow means the component was updated</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const { content } = event.target;

          const newValue = content.value;

          setItems((currentItems) => [...currentItems, newValue]);

          event.target.reset();
        }}
      >
        <input name="content" />
        <button>add</button>
      </form>

      <div>
        <h2>Array index as key prop</h2>
        {items.map((content, index) => (
          <Item
            onClick={() => {
              setItems((currentItems) =>
                currentItems.filter((currentItem) => currentItem !== content)
              );
            }}
            key={index} // bad practice
          >
            {content}
          </Item>
        ))}
      </div>

      <div>
        <h2>Unique key prop</h2>
        {items.map((content, index) => (
          <Item
            onClick={() => {
              setItems((currentItems) =>
                currentItems.filter((currentItem) => currentItem !== content)
              );
            }}
            key={content} // good practice
          >
            {content}
          </Item>
        ))}
      </div>
    </div>
  );
}
