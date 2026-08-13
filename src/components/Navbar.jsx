import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className='text-center text-white d-flex justify-content-evenly'>
        <div>
            <h1 className='text-dark'>JC</h1>
        </div>
        <div className='d-flex gap-3 justify-content-evenly align-items-center text-white'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">
                <button className='btn btn-primary'>Login</button>
            </Link>
            <Link to="/signup">
                <button className='btn btn-success'>Signup</button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar