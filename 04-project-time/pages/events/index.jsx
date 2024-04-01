import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { dummyGetAllEvents, getAllEvents } from "../../dummy-data";

function AllEventsPage({ events }) {
  const router = useRouter();
  function handleFindEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventSearch onSearch={handleFindEvents} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const events = await getAllEvents();
    return {
      props: {
        events: events,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error(err.message);
    const events = dummyGetAllEvents();
    return {
      props: {
        events: events,
      },
      revalidate: 60,
    };
  }
}

export default AllEventsPage;
