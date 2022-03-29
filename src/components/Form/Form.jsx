import { useState } from "react";
import styles from "./Form.module.css";

console.log(styles);

function Form({ todos, setTodos }) {
  const [urgent, setUrgent] = useState(false);
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!description) {
      console.log(urgent);
      return;
    }
    const todo = {
      description,
      urgent,
    };
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    });
    if (res.ok) {
      const { newTodo } = await res.json();
      console.log(newTodo);
      const newTodos = todos.concat(newTodo);
      setTodos(newTodos);
    }
  }
  return (
    <form className={styles.task} autoComplete="off" onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          name="item"
          id="item"
          placeholder="Type todo here..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className={`${
            urgent ? styles.inputButton && styles.clicked : styles.inputButton
          }`}
          onClick={(e) => {
            e.preventDefault();
            setUrgent(!urgent);
          }}
        >
          Urgent
        </button>
      </div>
      <button type="submit" className={styles.createbutton}>
        Create
      </button>
    </form>
  );
}

export default Form;
