import { useBlogPosts } from "../contexts/posts";

const PostItem = ({ post }) => {
  const blogPosts = useBlogPosts();
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>{post.title}</h3>
      <p>{post.summery}</p>
      <button
        type="button"
        onClick={() => blogPosts.actions.deletePost(post._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default PostItem;
