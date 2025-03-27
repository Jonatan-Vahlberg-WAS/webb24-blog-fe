import { Link, useParams } from "react-router-dom";
import { useBlogPosts } from "../contexts/posts";
import { useEffect } from "react";

function Post() {
  const { id } = useParams();

  const blogPosts = useBlogPosts();

  useEffect(() => {
    if(id) {
      blogPosts.actions.getPost(id);
    }
  }, [id]);

  console.log(blogPosts.post);

  return (
    <div>
      <h1>Post {id}</h1>
      {blogPosts.post && (
        <div>
          <h2>{blogPosts.post.title}</h2>
          <p>{blogPosts.post.content}</p>
        </div>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Post;
