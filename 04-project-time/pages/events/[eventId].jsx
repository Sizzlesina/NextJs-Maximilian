import { useRouter } from "next/router";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { dummyGetFeaturedEvents, dummyGetEventById } from "../../dummy-data";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

function EventDetailPage({ selectedEvent }) {
  const event = selectedEvent;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
export async function getStaticProps(context) {
  try {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);
    return {
      props: {
        selectedEvent: event,
      },
      revalidate: 30,
    };
  } catch (err) {
    console.log(err.message);
    const eventId = context.params.eventId;
    const event = dummyGetEventById(eventId);

    return {
      props: {
        selectedEvent: event,
      },
      revalidate: 30,
    };
  }
}

export async function getStaticPaths() {
  try {
    const events = await getFeaturedEvents();
    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
      paths: paths,
      fallback: true,
    };
  } catch (err) {
    console.error(err.message);
    const events = dummyGetFeaturedEvents();
    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
      paths: paths,
      fallback: "blocking",
    };
  }
}
export default EventDetailPage;
