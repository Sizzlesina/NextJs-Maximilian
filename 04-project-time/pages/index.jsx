import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data";
import { DUMMY_EVENTS } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}

export default HomePage;
