import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Signin.module.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signin } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    const user = {
      email,
      password,
    };
    signin(user);
  }

  return (
    <>
      <h1 className={styles.mainH1}>Sign in to your account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.email}
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.inlineDiv}>
          <span className={styles.checkboxSpan}>
            <input type="checkbox" />
            Remember me
          </span>
          <a
            href="#"
            className={styles.signupLink}
            onClick={(e) => navigate("/signup")}
          >
            Sign up instead
          </a>
        </div>
        <button className={styles.submit}>Submit</button>
      </form>
    </>
  );
}

export default Signin;
