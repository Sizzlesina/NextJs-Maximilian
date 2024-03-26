function EventItem({ event }) {
  return (
    <li>
      <img src={event.src} alt={event.title} />
    </li>
  );
}

export default EventItem;
