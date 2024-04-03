import { useRef } from "react";
import styles from "./NewsletterRegistration.module.css";

function NewsletterRegistration() {
  const inputEmail = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = inputEmail.current.value;
    const reqBody = { email: enteredEmail };

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
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
