// Component imports
import PostContent from "../../components/posts/post-detail/PostContent";
// Utility imports
import { getPostData, getPostFiles } from "../../lib/posts-util";

function PostDetailPage({ post }) {
  return (
    <div>
      <PostContent post={post} />
    </div>
  );
}

// Pre-rendering markdown data (Just the selected post)
export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

// For pre-rendering slug pages we need this function to manage the paths
export function getStaticPaths() {
  const postFileNames = getPostFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
