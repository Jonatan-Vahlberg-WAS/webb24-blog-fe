import { useBlogPosts } from "../contexts/posts";

const PostItem = ({ post }) => {
  const blogPosts = useBlogPosts();
  const { title, user, categories, createdAt } = post;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div className="list-item">
      <div className="list-item__title">{title}</div>
      {user && <div className="list-item__user">{user.name} ({user.email})</div>}
      <div className="list-item__categories">
        {categories.map((cat, i) => (
          <span key={i} className="list-item__category">{cat}</span>
        ))}
      </div>
      <div className="list-item__created-at">{date}</div>
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
