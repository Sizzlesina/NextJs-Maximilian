import { useRef } from "react";
import styles from "./NewsletterRegistration.module.css";
import useNotification from "../../hooks/useNotification";

function NewsletterRegistration() {
  const inputEmail = useRef();
  const { showNotification } = useNotification();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = inputEmail.current.value;
    const reqBody = { email: enteredEmail };

    showNotification({
      title: "Signing up!",
      message: "Registring for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })  
      .catch((err) => {
        showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={inputEmail}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button type='submit'>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
