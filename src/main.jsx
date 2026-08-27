import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Layout from './Layout'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ErrorPage from './pages/ErrorPage'
import Layout from './Layout'
import UserInfo from './pages/UserInfo'

const myRoutes = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    errorElement : <ErrorPage/>,
    children:[
      
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
      },
      {
        path:'users/:id',
        element : <UserInfo/>
      },
      {
        path:'*',
        element:<ErrorPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRoutes}/>
  </StrictMode>,
)
