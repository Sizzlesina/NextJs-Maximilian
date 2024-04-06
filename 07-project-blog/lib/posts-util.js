// Built-in imports
import fs from "fs";
import path from "path";
// Package imports
import matter from "gray-matter";

// Current directory of the posts folder
const postsDirectory = path.join(process.cwd(), "posts");

// Extract date from a specified file inside the posts folder
function getPostData(fileName) {
  // selecting a file path inside the posts folder
  const filePath = path.join(postsDirectory, fileName);
  // selecting the content inside that file (second argument said : file encoding is utf-8 so it supports all those unicode characters)
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // select the meta data from the content (Only meta data)
  const { data, content } = matter(fileContent);
  // Removes the file extension
  const postSlug = fileName.replace(/\.md$/, "");
  // Create a new data and add content and slug properties to it
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  // Return the newly created data
  return postData;
}
// Selecting all the files inside the posts folder
export function getAllPosts() {
  // Selecting all the files
  const postFiles = fs.readdirSync(postsDirectory);

  // Get the content data from all the files
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  // Sort the files based on the dates inside them contents
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  // Return sorted posts array
  return sortedPosts;
}

// Get the post files which isFeatured : true
export function getFeaturedPosts() {
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
