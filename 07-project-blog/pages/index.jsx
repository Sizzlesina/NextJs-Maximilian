// Next js imports
import Head from "next/head";
// Component imports
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import Hero from "../components/home-page/Hero";
// Utility imports
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage({ posts }) {
  return (
    <>
    <Head>
      <title>Sina's blog</title>
      <meta name="description" content="I work with Next js and front-end languages"/>
    </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

// Pre-rendering the markdown data (Featured posts)
export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;

// DONE