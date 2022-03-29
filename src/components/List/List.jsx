import React from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./List.module.css";

const List = ({ todos, handleDelete }) => {
  return (
    <>
      <h3 className={styles.listH3}>Todos</h3>
      <ul className={styles.list}>
        {todos
          .sort((a, b) => {
            return b.urgent - a.urgent;
          })
          .map((item) => (
            <li id={item._id} className={styles.shoppingItem}>
              <ListItem handleDelete={handleDelete} item={item} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default List;
