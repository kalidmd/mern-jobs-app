import React from 'react'
import { NavLink } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <main className='page-not-found-cont'>
        <h1>401 | Unauthorized!</h1>
        <NavLink to={'/'}> Home </NavLink>
    </main>
  )
}

export default Unauthorized