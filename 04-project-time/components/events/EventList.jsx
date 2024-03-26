import EventItem from "./EventItem";

function EventList({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          location={event.location}
          image={event.image}
          date={event.date}
          id={event.id}
        />
      ))}
    </ul>
  );
}

export default EventList;
