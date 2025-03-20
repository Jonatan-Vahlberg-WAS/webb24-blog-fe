import './App.css'
import { useBlogPosts } from './contexts/posts'

function App() {

  const blogPosts = useBlogPosts()

  return (
    <main>
      <h1>
        Blog
      </h1>
      <div>
        {blogPosts.posts.map(post => (
          <div key={post._id} style={{ marginBottom: 16}}>
            <h3> 
            {post.title}
            </h3>
            <p>
              {post.summery}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
