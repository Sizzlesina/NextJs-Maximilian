// Component imports
import PostsGrid from "../posts/PostsGrid";

// CSS module imports
import styles from "./FeaturedPosts.module.css";

function FeaturedPosts({ posts }) {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
