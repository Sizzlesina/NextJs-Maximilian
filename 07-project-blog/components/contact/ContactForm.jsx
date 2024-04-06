// Built-in imports
import { useEffect, useState } from "react";
// CSS moudle import
import styles from "./ContactForm.module.css";
// Utility imports
import { sendContactData } from "../../lib/utils";
// Component imports
import Notification from "../ui/Notification";

function ContactForm() {
  // Instead of the useRef we will use useState for getting the input data
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // "pending", "success" , "error"
  const [requestError, setRequestError] = useState(""); // Error message

  // Hide notification after some seconds
  useEffect(
    function () {
      if (requestStatus === "success" || requestStatus === "error") {
        const timer = setTimeout(() => {
          setRequestStatus(null);
          setRequestError(null);
        }, 3000);

        return () => clearTimeout(timer);
      }
    },
    [requestStatus]
  );

  // Submit form handler
  async function sendMessageHandler(event) {
    // Prevent the default behavior of the form element
    event.preventDefault();

    // ! optional : Add client side validations
    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredEmail,
        message: enteredMessage,
      });
      setRequestStatus("success");

      // Clear the input values
      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  // Pending notification
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      tittle: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  // Success notification
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully!",
    };
  }

  // Error notification
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
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
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
