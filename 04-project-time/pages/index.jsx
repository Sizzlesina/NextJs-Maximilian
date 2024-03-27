import EventList from "../components/events/EventList";
import ErrorAlert from "../components/ui/ErrorAlert";
import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvents} />
      <ErrorAlert>
        <p>This Project is DONE </p>
        <p>(Undo this field if you want to)</p>
      </ErrorAlert>
    </div>
  );
}

export default HomePage;
