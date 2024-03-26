import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    // load data...

    /*
    @ Syntax 1:
     router.push("/clients/max/projecta"); => We can go back after the navigation

     router.replace("/clients/max/projecta"); => We can't go back after the navigation
     */

    // @ Syntax 2:
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
