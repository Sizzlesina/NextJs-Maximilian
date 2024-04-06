// Built-in imports
import fs from "fs";
import path from "path";
// Package imports
import matter from "gray-matter";

// # Current directory of the posts folder
const postsDirectory = path.join(process.cwd(), "posts");
// ------------------------------------------------------------------------------------------------------------------------------------------
export function getPostFiles() {
  return fs.readdirSync(postsDirectory);
}
// ------------------------------------------------------------------------------------------------------------------------------------------
// @ Extract date from a specified file inside the posts folder
export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ''); // Removes the file extension

  const filePath = path.join(postsDirectory, `${postSlug}.md`); // selecting a file path inside the posts folder

  const fileContent = fs.readFileSync(filePath, "utf-8"); // selecting the content inside that file (second argument said : file encoding is utf-8 so it supports all those unicode characters)

  const { data, content } = matter(fileContent); // select the meta data from the content (Only meta data)

  const postData = {
    // Create a new data and add content and slug properties to it
    slug: postSlug,
    ...data,
    content,
  };

  return postData; // Return the newly created data
}

// ------------------------------------------------------------------------------------------------------------------------------------------
// @ Selecting all the files inside the posts folder
export function getAllPosts() {
  const postFiles = getPostFiles();

  // Get the content data from all the files
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  // Sort the files based on the dates inside them contents
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts; // Return sorted posts array
}

// ------------------------------------------------------------------------------------------------------------------------------------------
// @ Get the post files which isFeatured : true
export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
// ------------------------------------------------------------------------------------------------------------------------------------------
