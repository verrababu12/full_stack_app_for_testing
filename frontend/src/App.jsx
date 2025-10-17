// import React, { useEffect, useState } from "react";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [text, setText] = useState("");

//   // Fetch todos
//   useEffect(() => {
//     fetch("/api/todos")
//       .then((res) => res.json())
//       .then(setTodos);
//   }, []);

//   // Add todo
//   const addTodo = async () => {
//     const res = await fetch("/api/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text }),
//     });
//     const newTodo = await res.json();
//     setTodos([...todos, newTodo]);
//     setText("");
//   };

//   // Delete todo
//   const deleteTodo = async (id) => {
//     await fetch(`/api/todos/${id}`, { method: "DELETE" });
//     setTodos(todos.filter((t) => t._id !== id));
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>📝 MERN Todo App</h1>
//       <input
//         placeholder="Enter todo..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button onClick={addTodo}>Add</button>

//       <ul>
//         {todos.map((t) => (
//           <li key={t._id}>
//             {t.text}
//             <button onClick={() => deleteTodo(t._id)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // ✅ Base URL (auto-detects environment)
  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:3001"
      : "https://full-stack-app-for-testing.vercel.app";

  // ✅ Fetch todos
  useEffect(() => {
    fetch(`${API_BASE}/api/todos`)
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // ✅ Add todo
  const addTodo = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Error adding todo");
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE}/api/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting todo");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 MERN Todo App</h1>
      <input
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.text}
            <button onClick={() => deleteTodo(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
