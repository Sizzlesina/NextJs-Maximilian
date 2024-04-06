// Component imports
import AllPosts from "../../components/posts/AllPosts";
// Utility imports
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage({ posts }) {
  return <AllPosts posts={posts} />;
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
