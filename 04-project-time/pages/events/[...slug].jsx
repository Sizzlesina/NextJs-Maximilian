import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { dummyGetFilteredEvents } from "../../dummy-data";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filteredData = router.query.slug;
  const { data, error } = useSWR(
    "https://nextjs-course-434e2-default-rtdb.firebaseio.com/events.json",
    async (url) => {
      const { data } = await axios.get(url);

      if (data) {
        const events = [];
        for (const key in data) {
          events.push({
            id: key,
            ...data[key],
          });
        }
      }
      setLoadedEvents(events);
    }
  );
  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }
  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     const { params } = context;
//     const filteredData = params.slug;

//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//       isNaN(numYear) ||
//       isNaN(numMonth) ||
//       numYear > 2030 ||
//       numYear < 2021 ||
//       numMonth < 1 ||
//       numMonth > 12
//     ) {
//       return {
//         props: {
//           hasError: true,
//         },
//       };
//     }

//     const filteredEvents = await getFilteredEvents({
//       year: numYear,
//       month: numMonth,
//     });
//     return {
//       props: {
//         events: filteredEvents,
//         date: {
//           year: numYear,
//           month: numMonth,
//         },
//       },
//     };
//   } catch (err) {
//     console.error(err.message);
//     const { params } = context;
//     const filteredData = params.slug;

//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//       isNaN(numYear) ||
//       isNaN(numMonth) ||
//       numYear > 2030 ||
//       numYear < 2021 ||
//       numMonth < 1 ||
//       numMonth > 12
//     ) {
//       return {
//         props: {
//           hasError: true,
//         },
//       };
//     }

//     const filteredEvents = dummyGetFilteredEvents({
//       year: numYear,
//       month: numMonth,
//     });
//     return {
//       props: {
//         events: filteredEvents,
//         date: {
//           year: numYear,
//           month: numMonth,
//         },
//       },
//     };
//   }
// }

export default FilteredEventsPage;
