import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // const APIUrl = 'https://mern-jobs-app-llm4.onrender.com';
    const localHost = 'http://localhost:5000';

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const errorText = document.getElementById('error-text');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/register')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
            // errorText.textContent = data.msg;
            setError(data.msg);
        } else {
            setError(false);
            // errorText.textContent = '';
            navigate('/dashboard');
        }

        setEmail("");
        setPassword("");
        setIsLoading(false);
}

  return (
    <main className='login-cont'>
        <h2 className='login-title'> Login </h2>
        <form onSubmit={handleLogin} className='login-form'>
            <label>Email</label>
            <input 
                className={error ? 'input-error': 'input-valid'}
                type="email" 
                placeholder='enter email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                className={error ? 'input-error': 'input-valid'}
                type="password" 
                placeholder='enter password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button> { isLoading ? 'Authorizing...' : 'Login'} </button>
        </form>

        <p className='not-a-member'> 
            Not a member yet?&nbsp;
            <span> 
                <button onClick={navigateToRegister}>Register</button> 
            </span> 
        </p>

        { error &&  <p id='error-text'>{error +', Please Try Again Correctly.'}</p>}
        
    </main>
  )
}

export default Login;