// Next js imports
import Head from "next/head";
// Component imports
import AllPosts from "../../components/posts/AllPosts";
// Utility imports
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage({ posts }) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

// Pre-rendering the markdown data (All posts)
export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
