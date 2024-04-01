import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { dummyGetFilteredEvents } from "../../dummy-data";

function FilteredEventsPage(props) {
  const router = useRouter();

  if (props.hasError) {
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

  const filteredEvents = props.events;

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
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const filteredData = params.slug;

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
      numMonth > 12
    ) {
      return {
        props: {
          hasError: true,
        },
      };
    }

    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });
    return {
      props: {
        events: filteredEvents,
        date: {
          year: numYear,
          month: numMonth,
        },
      },
    };
  } catch (err) {
    console.error(err.message);
    const { params } = context;
    const filteredData = params.slug;

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
      numMonth > 12
    ) {
      return {
        props: {
          hasError: true,
        },
      };
    }

    const filteredEvents = dummyGetFilteredEvents({
      year: numYear,
      month: numMonth,
    });
    return {
      props: {
        events: filteredEvents,
        date: {
          year: numYear,
          month: numMonth,
        },
      },
    };
  }
}

export default FilteredEventsPage;
