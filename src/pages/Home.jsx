import { Link } from "react-router-dom";
import { useBlogPosts } from "../contexts/posts";
import PostItem from "../components/PostItem";
import PostForm from "../components/PostForm";
import { useUser } from "../contexts/user";

function Home() {
  const user = useUser();
  const blogPosts = useBlogPosts();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          {user.userId && (
            <li>
              <button onClick={user.actions.logout}>Logout</button>
            </li>
          )}
          {!user.userId && (
            <li>
              <Link to="/login">Go to Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <h1>Blog</h1>
        <div>
          {blogPosts.posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <PostForm />
      </main>
    </div>
  );
}

export default Home;
