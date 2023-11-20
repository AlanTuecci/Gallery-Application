import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            <h1>Alan Tuecci - Individual Project</h1>
        </div>
        <ul className='navbar-menu'>
            <li><Link to="/"><h2 className='white-h2'>Home</h2></Link></li>
        </ul>
    </div>
  )
}

export default Navbar
