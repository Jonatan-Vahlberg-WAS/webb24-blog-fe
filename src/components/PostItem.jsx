import { Link } from "react-router-dom";
import { useBlogPosts } from "../contexts/posts";
import { useUser } from "../contexts/user";

const PostItem = ({ post }) => {
  const user = useUser()
  const blogPosts = useBlogPosts();
  const { title, user:author, categories, createdAt } = post;
  const date = new Date(createdAt).toLocaleDateString();

  const isAdmin = user.user?.isAdmin
  const isAuthor = user.user?._id === author._id

  const canDelete = isAdmin || isAuthor;

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="list-item">
        <div className="list-item__title">{title}</div>
        {author && (
          <div className="list-item__user">
            {author.name} ({author.email})
          </div>
        )}
        <div className="list-item__categories">
        {categories.map((category, i) => (
          <span key={i} className="list-item__category">{category.name}</span>
        ))}
      </div>
      <div className="list-item__created-at">{date}</div>
     {canDelete &&  <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          blogPosts.actions.deletePost(post._id);
        }}
      >
        Delete
        </button>}
      </div>
    </Link>
  );
};

export default PostItem;
