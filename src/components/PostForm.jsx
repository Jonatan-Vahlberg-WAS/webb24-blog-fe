import { useState } from "react";
import { useBlogPosts } from "../contexts/posts";
import { useUser } from "../contexts/user";

const TEMP_USER = "67d2a056199c3fb9537f303f";

const PostForm = () => {
  const user = useUser()
  const blogPosts = useBlogPosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = () => {
    console.log(title, content);
    blogPosts.actions.createPost(
      {
        title,
        content,
        categories: [],
      },
      () => {
        setTitle("");
        setContent("");
      }
    );
  };
  const isLoggedIn = user.user

  if(!isLoggedIn) {
    return (
        <div>
            You are not logged in
        </div>
    )
  }

  return (
    <form
      className="post-form" // Apply the CSS class
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        required
      />
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        required
      ></textarea>
      <button type="submit">Create post</button>
    </form>
  );
};

export default PostForm;