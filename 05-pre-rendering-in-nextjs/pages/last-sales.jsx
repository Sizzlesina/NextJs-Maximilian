import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  // Fetch data in another way from server side AND Format the form of data
  const { data, error } = useSWR(
    "https://nextjs-course-434e2-default-rtdb.firebaseio.com/sales.json",
    async (url) => {
      const { data } = await axios.get(url);
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
      return data;
    }
  );

  // Error handling (If fail fetching data)
  if (error) {
    return <p>No data yet...</p>;
  }

  // If the data is not exist yet or the render's not finished
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  // Main code
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get(
      "https://nextjs-course-434e2-default-rtdb.firebaseio.com/sales.json"
    );
    const transformedSales = [];
    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    return {
      props: {
        sales: transformedSales,
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {
        sales: [],
      },
      revalidate: 10,
    };
  }
}

export default LastSalesPage;
