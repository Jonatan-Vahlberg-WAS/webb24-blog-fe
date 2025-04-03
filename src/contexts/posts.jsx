import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user";

const defaultState = {
  posts: [],
  post: null,
  actions: {
    getPosts: () => Promise.resolve(),
    getPost: (_id) => Promise.resolve(),
    createPost: (
      // eslint-disable-next-line no-unused-vars
      postData,
      // eslint-disable-next-line no-unused-vars
      onSuccess = () => {}
    ) => Promise.resolve(),
    deletePost: (_id) => Promise.resolve(),
  },
};

const BlogPostContext = createContext(defaultState);

export const BlogPostProvider = ({ children }) => {
  const user = useUser()

  const [posts, setPosts] = useState(defaultState.posts);
  const [post, setPost] = useState(defaultState.post);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/posts/`);
    const response = await fetch(url);
    if (response.status === 200) {
      const posts = await response.json();
      setPosts(posts);
    }
  };

  const getPost = async (_id) => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${_id}`);
    const response = await fetch(url);
    if (response.status === 200) {
      const post = await response.json();
      setPost(post);
    }
  };

  const createPost = async (postData, onSuccess = () => {}) => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/posts/`);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { 
        "Content-Type": "application/json",
        "Authorization": user.actions.getAuthorizationHeader() 
      },
    });
    if (response.status === 201) {
      getPosts()
      onSuccess();
    }
  };

  const deletePost = async(_id) => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${_id}`);
    const response = await fetch(url, {
      method: "DELETE",
    });

    if(response.status === 200) {
      setPosts(state => state.filter(post => post._id !== _id))
    }

  }

  return (
    <BlogPostContext.Provider
      value={{
        posts,
        post,
        actions: {
          getPosts,
          getPost,
          createPost,
          deletePost
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
