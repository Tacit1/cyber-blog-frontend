// import { useState } from 'react'
import './App.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { BlogPost } from './components/BlogPost/BlogPost'
import { Nav } from './components/nav/Nav'
import { Footer } from './components/Footer/Footer'
import { Admin } from './components/Admin/Admin'
import { GuardedRoute } from './guards/auth.guard'
import { useState } from 'react'
import { Posts } from './components/Admin/Posts/Posts'




function App() {

  const [isAuthenticated, setAuth] = useState(false);  
  console.log("app mounted");
  function successfulLogin(value: any){
    console.log("successful login", value)
    setAuth(true);
  }
  
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <HomePage></HomePage>
    }, 
    {
      path: '/blog/:id',
      element: <BlogPost></BlogPost>
    },
    {
      path: '/admin/',
      element: GuardedRoute(<Admin></Admin>, isAuthenticated, successfulLogin),
    },
    {
      path: '/admin/posts',
      element: GuardedRoute(<Posts></Posts>, isAuthenticated, successfulLogin),
    }
  ])

  return (
    <>
    <Nav></Nav>
    <RouterProvider router={router}></RouterProvider>
    <Footer></Footer>
    </>
  )
}

export default App
