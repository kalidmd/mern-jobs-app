import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <main className='page-not-found-cont'>
        <h1>404 | Page Not Found!</h1>
        <NavLink to={'/'}> Home </NavLink>
    </main>
  )
}

export default PageNotFound