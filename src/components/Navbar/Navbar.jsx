import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <div className={styles.navigator}>
      <span className={styles.homespan}>Dashboard</span>
      <div className={styles.navigatorDiv}>
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
          className={styles.bellIcon}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>

        <img src="https://picsum.photos/200/300" alt="photo" />
        <button type="submit" className={styles.logoutButton} onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
