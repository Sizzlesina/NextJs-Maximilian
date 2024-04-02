import { useRef } from "react";

function HomePage() {
  const emailInput = useRef();
  const feedbackInput = useRef();

  function handleSubmitForm(e) {
    e.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredFeedback = feedbackInput.current.value;

    fetch()
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInput} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea
            name='feedback'
            id='feedback'
            rows='5'
            ref={feedbackInput}></textarea>
        </div>
        <button type='submit'>Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
