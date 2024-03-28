function UserProfilePage({ username }) {
  return <h1>{username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context; // With getServerSideProps function we can have access to requests and responses
  // @ This built in function is for when we dont need the request and response but we need to ensure that this code will execute for every request
  // @ Or when we need special header or cookie data


  return {
    props: {
      username: "Max",
    },
  };
}
