import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // const APIUrl = 'https://mern-jobs-app-llm4.onrender.com';
    const localHost = 'http://localhost:5000';

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [ errorAlert, setErrorAlert ] = useState();
    const errorText = document.getElementById('error-text')

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/register')
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${localHost}/api/v1/users/login`, {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        localStorage.setItem('token', data.token)

        if (data.msg) {
            localStorage.removeItem('token');
            errorText.textContent = data.msg;
        } else {
            errorText.textContent = '';
            navigate('/dashboard');
        }

        setEmail("");
        setPassword("");
}

  return (
    <main className='login-cont'>
        <h2 className='login-title'> Login </h2>
        <form onSubmit={handleLogin} className='login-form'>
            <label>Email</label>
            <input 
                type="email" 
                placeholder='enter email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type="password" 
                placeholder='enter password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button> Login </button>
        </form>

        <p className='not-a-member'> 
            Not a member yet?&nbsp;
            <span> 
                <button onClick={navigateToRegister}>Register</button> 
            </span> 
        </p>

        <p id='error-text'></p>
    </main>
  )
}

export default Login;