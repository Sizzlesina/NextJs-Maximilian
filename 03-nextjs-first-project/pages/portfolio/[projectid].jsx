import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();

  /*
  console.log(router.pathname);
  @ Output: portfolio/[projectid]
  console.log(router.query);
  @ Output: An object with the id we entered on the URL
  ++ To access the route id : router.query.projectid
*/

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
