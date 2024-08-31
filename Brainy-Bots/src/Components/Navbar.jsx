import React from 'react'
import './Styles/navbar.css'
import logo from '../Assets/7379365.png'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            <img src={logo} alt='logo' /> 
            <h1>UIDAI</h1>
        </div>
        <div className="elements">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Signup</li>
                <li>Login</li>
            </ul>
        </div>
      
    </div>
  )
}

export default Navbar
