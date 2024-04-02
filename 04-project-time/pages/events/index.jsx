// Next js imports
import { useRouter } from "next/router";
import Head from "next/head";

// Component imports
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";

// Handler function imports
import { dummyGetAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-util";

function AllEventsPage({ events }) {
  const router = useRouter();
  function handleFindEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
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
