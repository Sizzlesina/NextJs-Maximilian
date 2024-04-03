import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInput = useRef();
  const feedbackInput = useRef();

  function handleSubmitForm(e) {
    e.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredFeedback = feedbackInput.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function handleLoadFeedback() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmitForm}>
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
      <hr />
      <button onClick={handleLoadFeedback}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
