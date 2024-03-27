import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../dummy-data";

function AllEventsPage() {
  const events = getAllEvents();

  return (
    <>
      <EventSearch />
      <EventList events={events} />
    </>
  );
}

export default AllEventsPage;
