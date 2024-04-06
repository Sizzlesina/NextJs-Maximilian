// CSS module import
import { useState } from "react";
import styles from "./ContactForm.module.css";

function ContactForm() {
  // Instead of the useRef we will use useState for getting the input data
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  // Submit form handler
  function sendMessageHandler(event) {
    // Prevent the default behavior of the form element
    event.preventDefault();

    // ! optional : Add client side validations

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={styles.contact}>
      <h1>How can i help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        {/* Input container  */}
        <div className={styles.controls}>
          {/* Input box  */}
          <div className={styles.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          {/* Input box */}
          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>

        {/* Input box */}
        <div className={styles.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            rows='5'
            value={enteredMessage}
            onChange={(event) =>
              setEnteredMessage(event.target.value)
            }></textarea>
        </div>
        {/* Input actions */}
        <div className={styles.actions}>
          <button type='submit'>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
