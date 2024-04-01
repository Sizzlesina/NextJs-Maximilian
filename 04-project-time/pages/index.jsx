import EventList from "../components/events/EventList";
import { dummygGetFeaturedEvents } from "../dummy-data";
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
      revalidate: 10,
    };
  } catch (err) {
    console.log(err.message);
    const featuredEvents = dummygGetFeaturedEvents();
    return {
      props: {
        events: featuredEvents,
      },
      revalidate: 10,
    };
  }
}

export default HomePage;
