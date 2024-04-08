// Next Auth imports
import { signIn } from "next-auth/client";
// Built-in imports
import { useRef, useState } from "react";
// CSS module import
import styles from "./AuthForm.module.css";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const enteredEmail = emailInput.current.value;
      const enteredPassword = passwordInput.current.value;

      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        console.log(result);

        if (!result.error) {
        }
      } else {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInput} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInput} />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type='submit'
            className={styles.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
