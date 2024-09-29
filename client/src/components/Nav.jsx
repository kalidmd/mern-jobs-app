import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
        <NavLink to={'/'}>  
            <h1 className='nav-jobs-app'>Jobs<span>App</span> </h1>
        </NavLink>
    </nav>
  )
}

export default Nav