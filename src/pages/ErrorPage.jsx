import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100' 
    style={{height:"585px",backgroundColor:"black"}}>
        <h1 className='text-white'>Error : 404</h1>
        <Link to="/">
        <button className='btn btn-info'>Home</button>
        </Link>
    </div>
  )
}

export default ErrorPage