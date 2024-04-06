// CSS module import
import styles from "./ContactForm.module.css";

function ContactForm() {
  return (
    <section className={styles.contact}>
      <h1>How can i help you?</h1>
      <form className={styles.form}>
        {/* Input container  */}
        <div className={styles.controls}>
          {/* Input box  */}
          <div className={styles.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required />
          </div>
          {/* Input box */}
          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' required />
          </div>
        </div>

        {/* Input box */}
        <div className={styles.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea name='message' id='message' rows='5'></textarea>
        </div>
        {/* Input actions */}
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
