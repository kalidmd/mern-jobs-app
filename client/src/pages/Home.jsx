import React from 'react'
import { NavLink } from 'react-router-dom'
import jobImage from '../resources/images/job.png';

const Home = () => {
    const token = localStorage.getItem('token');

  return (
    <main className='home-cont'>
        <div className='home-content'>
            <h1 className='home-jobs-app'>Jobs<span>App</span> </h1>
            <p className='home-content-par'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque vitae erat pellentesque tincidunt vitae mauris dapibus scelerisque sit amet diam vitae mauris dapibus scelerisque sed. 
                <br/>
                <br/>
                sit amet diam vitae mauris dapibus scelerisque sed a tellus. Donec in justo quis elit iaculis pellentesque consectetur adipiscing diam vitae mauris dapibus  scelerisque sit amet diam vitae mauris dapibus scelerisque sed.
                <br/>
                <br/>
                Vestibulum in neque vitae erat pellentesque tincidunt vitae mauris dapibus scelerisque sit amet diam vitae mauris dapibus scelerisque sed.
            </p>
            {
                !token &&
                <div className='btn-cont'>    
                    <button className='home-content-btn'> 
                        <NavLink to={'login'}>Login</NavLink>  
                    </button>
                    <button className='home-content-btn'> 
                        <NavLink to={'register'}>Register</NavLink>  
                    </button>
                </div>
                      
            }
        </div>

        <div className='home-image'>
            <img width={400} src={jobImage} alt="job"/>
        </div>


    </main>
  )
}

export default Home