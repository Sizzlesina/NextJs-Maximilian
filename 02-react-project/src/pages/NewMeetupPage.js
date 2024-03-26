import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const history = useHistory();

  function handleAddMeetup(meetupData) {
    fetch("Some URL", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      () => history.replace("/") // This is the old syntax of navigation between routes (In the new syntax we use useNavigate )
    );
    // We can use axios too
    // In the course it used firebase database (More on that later)
  }

  return (
    <section>
      <h1>Add New Section</h1>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </section>
  );
}

export default NewMeetupPage;
