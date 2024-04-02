import EventList from "../components/events/EventList";
import { dummyGetFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage({ events }) {
  return (
    <div>
      <EventList events={events} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const featuredEvents = await getFeaturedEvents();
    return {
      props: {
        events: featuredEvents,
      },
      revalidate: 1800,
    };
  } catch (err) {
    const featuredEvents = dummyGetFeaturedEvents();
    return {
      props: {
        events: featuredEvents,
      },
      revalidate: 1800,
    };
  }
}

export default HomePage;
