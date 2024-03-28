import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getData() {
      try {
        // Fetch data
        setIsLoading(true);
        const response = await fetch(
          "https://nextjs-course-434e2-default-rtdb.firebaseio.com/sales.json"
        );
        const data = await response.json();

        // Transform the data in a Javascript form to use in the application
        const transfromedSales = [];
        for (const key in data) {
          transfromedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        // Store the data to show in the application
        setSales(transfromedSales);
        setIsLoading(false);
      } catch (err) {
        // Error handling in case we dont get the data
        console.error(err.message);
        throw new Error("Failed to fetch data!");
      }
    }

    // Calling the function
    getData();
  }, []);

  // Loading handler
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // In case we dont have the data (This piece of code will be pre-rendered by nextJS)
  if (!sales) {
    return <p>No data yet...</p>;
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
