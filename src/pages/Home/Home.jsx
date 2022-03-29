import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);

  async function handleItemDelete(item) {
    const duppedItems = [...todos];
    duppedItems.indexOf(item);
    const itemToDelete = duppedItems.findIndex((el) => {
      return el._id === item._id;
    });
    console.log(itemToDelete);
    duppedItems.splice(itemToDelete, 1);
    console.log(duppedItems);
    setTodos(duppedItems);
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        const { todos } = await res.json();
        setTodos(todos);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.todoList}>
        <h1 className={styles.h1todo}>Create new todo item</h1>
        <Form todos={todos} setTodos={setTodos} />
        <List todos={todos} handleDelete={handleItemDelete} />
      </div>
    </>
  );
}

export default Home;
