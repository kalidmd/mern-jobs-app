import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Nav = () => {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  let fName

  if (username) {
    fName = username.split(' ')[0];
    fName = fName.charAt(0).toUpperCase() + fName.slice(1);
  }

  useEffect(()=> {
    const fetchUser = async () => {
      let result = await fetch('http://localhost:5000/api/v1/users/dashboard', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      result = await result.json();
      setUsername(result.name);
    }
    
    fetchUser();
    
  
  }, [token])

    const logout = () => {
    console.log('Logged Out');
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav>
        <NavLink to={'/'}>  
          <h1 className='nav-jobs-app'>
            Jobs
            <span className='blue-text'>App</span> 
          </h1>
        </NavLink>

        {
          token && 
            <NavLink 
              className='dashboard' 
              to={'dashboard'}
            > 
              Dashboard 
            </NavLink>
        }

        { username && 
          <div className='user-name-cont'>
            <p>
              Hello, <span className='blue-text'> { fName } </span> 
            </p> 
            <button onClick={logout}>Logout</button>
          </div>
        } 
    </nav>
  )
}

export default Nav