import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  posts: [],
  actions: {
    getPosts: () => Promise.resolve(),
  },
};

const BlogPostContext = createContext(defaultState);

export const BlogPostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/posts/`)
    const response = await fetch(url);
    if (response.status === 200) {
      const posts = await response.json();
      setPosts(posts);
    }
  };

  return (
    <BlogPostContext.Provider
      value={{
        posts,
        actions: {
          getPosts,
        },
      }}
    >
      {children}
    </BlogPostContext.Provider>
  );
};

export const useBlogPosts = () => {
  const blogPosts = useContext(BlogPostContext);
  return blogPosts;
};
