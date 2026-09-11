import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Layout from './Layout'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'
import Layout from './Layout'
import Sarees from './pages/Sarees';
import Jewellery from './pages/Jewellery';
import Beauty from './pages/Beauty';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const myRoutes = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    errorElement : <ErrorPage/>,
    children:[
      {
        path:'/',
        element:<Home/>
      }
      ,
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/about',
        element : <About/>
      },
      {
        path:'/sarees',
        element:<Sarees/>
      },
      {
        path:'/jewellery',
        element:<Jewellery/>
      },
      {
        path:'/beauty-services',
        element:<Beauty/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/cart',
        element:<Cart/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={myRoutes}/>
  </StrictMode>,
)
