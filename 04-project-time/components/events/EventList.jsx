import EventItem from "./EventItem";
import styles from "./EventList.module.css";

function EventList({ events }) {
  return (
    <ul className={styles.list}>
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
