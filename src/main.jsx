import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Layout from './Layout'
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ErrorPage from './pages/ErrorPage'
import Layout from './Layout'

const myRoutes = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    errorElement : <ErrorPage/>,
    children:[
      {
        path:'/',
        element : <Home/>,
        errorElement : <ErrorPage/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRoutes}/>
  </StrictMode>,
)
