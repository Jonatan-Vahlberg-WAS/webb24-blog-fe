import { Link } from "react-router-dom";
import { useBlogPosts } from "../contexts/posts";

const PostItem = ({ post }) => {
  const blogPosts = useBlogPosts();
  const { title, user, categories, createdAt } = post;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="list-item">
        <div className="list-item__title">{title}</div>
        {user && (
          <div className="list-item__user">
            {user.name} ({user.email})
          </div>
        )}
        <div className="list-item__categories">
        {categories.map((category, i) => (
          <span key={i} className="list-item__category">{category.name}</span>
        ))}
      </div>
      <div className="list-item__created-at">{date}</div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          blogPosts.actions.deletePost(post._id);
        }}
      >
        Delete
        </button>
      </div>
    </Link>
  );
};

export default PostItem;
