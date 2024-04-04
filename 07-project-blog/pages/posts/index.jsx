// Component imports
import AllPosts from "../../components/posts/AllPosts";

// Dummy data import
import { DUMMY_POSTS } from "../../dummy-data";

function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
