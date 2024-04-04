// Next js imports
import Head from "next/head";

// Component imports
import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

// Handler function imports
import { dummyGetFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util.js";

function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={events} />
    </div>
  );
}

// Pre-fetching the data
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
