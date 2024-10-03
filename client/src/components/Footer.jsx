import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <p> <NavLink to='/'>  Jobs App </NavLink> | Made By <span> Kalid Mohammed </span> </p>
        <a 
            target='_blank'
            rel='noreferrer noopener' 
            href="https://kalidmohammed.com/"
        > 
            www.kalidmohammed.com 
        </a>
    </footer>

  )
}

export default Footer