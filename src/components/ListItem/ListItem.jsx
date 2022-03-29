import React, { useState } from "react";
// import ModalIcon from "./modal-icon";
import Modal from "../Modal";
import styles from "./Listitem.module.css";

const ListItem = ({ handleDelete, item }) => {
  const [showModal, setModal] = useState(false);
  const toggleModal = () => setModal(!showModal);
  console.log(showModal);
  const [modalInput, setModalInput] = useState("");
  const [isUrgent, setUrgent] = useState(false);

  async function deleteItem(item) {
    const res = await fetch("http://localhost:3000/todos/" + item._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      handleDelete(item);
    }
  }

  async function updateItem(item) {
    const res = await fetch("http://localhost:3000/todos/" + item._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        description: modalInput,
        urgent: isUrgent,
      }),
    });
    if (res.ok) {
      const { newTodo } = await res.json();
      console.log(newTodo);
      //   const newTodos = todos.concat(newTodo);
      //   setTodos(newTodos);
    }
  }

  return (
    <>
      <div className={styles.itemCircleContainer}>
        <span className={styles.itemName}>{item.description}</span>
        <div className={styles.circleContainer}>
          <span
            className={`${styles.circle} ${item.urgent && styles.urgent}`}
          ></span>
        </div>
      </div>
      <div className={styles.checkboxContainer}>
        <label className={styles.container} for="myCheckboxId">
          <input
            className={styles.checkbox}
            value={item._id}
            type="checkbox"
            checked={`${item.checked && "checked"}`}
            id={styles.myCheckboxId}
          />
          <div className={styles.checkboxBox}></div>
        </label>
        <button className={styles.modalButton} onClick={(e) => toggleModal()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-edit"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button
          className={styles.removeButton}
          aria-label={`Remove ${item.name}`}
          value={item._id}
          onClick={() => {
            deleteItem(item);
            // handleDelete(item);
          }}
        >
          &times;
        </button>
        {showModal ? (
          <Modal>
            <div className={styles.modalWindow}>
              <div className={styles.innerModal}>
                <h1>Update Todo</h1>
                <form
                  className={styles.modalForm}
                  autoComplete="off"
                  onSubmit={() => updateItem(item)}
                >
                  <div className={styles.inputContainerModal}>
                    <input
                      className={styles.inputField}
                      type="text"
                      name="item"
                      id="item"
                      placeholder="Type todo here..."
                      onChange={(e) => setModalInput(e.target.value)}
                    />
                    <button
                      className={`
                        ${
                          isUrgent
                            ? styles.inputButton && styles.clicked
                            : styles.inputButton
                        }
                      `}
                      onClick={(e) => {
                        e.preventDefault();
                        setUrgent(!isUrgent);
                      }}
                    >
                      Urgent
                    </button>
                  </div>
                  <button type="submit" className={styles.updateButton}>
                    Update
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default ListItem;
