import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    const user = {
      email,
      password,
      name,
    };
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (res.ok) {
      navigate("/signin");
    }
  }

  return (
    <>
      <h1 className={styles.mainH1}>Create new account</h1>
      {/* {error ? <h2 id="error">{error}</h2> : null} */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          class="name"
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          class="email"
          type="email"
          placeholder="Email address"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          class="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          class="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          // onInput={clearError()}
        />
        <div className={styles.inlineDiv}>
          <a
            href="#"
            className={styles.signupLink}
            onClick={(e) => navigate("/signin")}
          >
            Sign in instead
          </a>
        </div>
        <button className={styles.submit}>Sign up</button>
      </form>
    </>
  );
}

export default Signup;
