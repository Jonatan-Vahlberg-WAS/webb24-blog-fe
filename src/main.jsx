import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BlogPostProvider } from './contexts/posts.jsx'
import { UserProvider } from './contexts/user.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BlogPostProvider>
        <App />
      </BlogPostProvider>
    </UserProvider>
  </StrictMode>,
)
