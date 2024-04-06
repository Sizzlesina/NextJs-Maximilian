// Component imports
import PostHeader from "./PostHeader";

// Dummy data import
import { DUMMY_POSTS } from "../../../data/dummy-data";

// CSS module import
import styles from "./PostContent.module.css";

// Destruct a object from dummy data
const POST = DUMMY_POSTS[0];

// A new property for the destructed object
const NEW_POST = {
  ...POST,
  content: "# This is a first post",
};

function PostContent() {
  const imagePath = `/images/posts/${NEW_POST.slug}/${NEW_POST.image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={NEW_POST.title} image={imagePath} />
      {NEW_POST.content}
    </article>
  );
}

export default PostContent;
