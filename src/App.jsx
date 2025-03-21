import './App.css'
import AuthForm from './components/AuthForm'
import PostForm from './components/PostForm'
import PostItem from './components/PostItem'
import { useBlogPosts } from './contexts/posts'

function App() {

  const blogPosts = useBlogPosts()

  return (
    <main>
      <h1>
        Blog
      </h1>
      <AuthForm/>
      <div>
        {blogPosts.posts.map(post => (
          <PostItem
            key={post._id}
            post={post}
          />
        ))}
      </div>
      <PostForm/>
    </main>
  )
}

export default App
