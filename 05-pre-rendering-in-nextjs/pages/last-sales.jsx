import { useEffect, useState } from "react";
import useSWR from "swr";
function LastSalesPage() {
  const [sales, setSales] = useState();

  // Fetch data in another way from server side AND Format the form of data
  // @ Second parameter of the useSWR is a fetcher function which in it we must first fetch the data in the parameters of the function then do whatever we want to the data
  const { data, error } = useSWR(
    "https://nextjs-course-434e2-default-rtdb.firebaseio.com/sales.json",
    async function getData(url) {
      const response = await fetch(url);
      const data = await response.json();

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
  if (!data || !sales) {
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

export default LastSalesPage;
