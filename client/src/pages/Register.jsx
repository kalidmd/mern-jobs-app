import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // const APIUrl = 'https://mern-jobs-app-llm4.onrender.com';
    const localHost = 'http://localhost:5000';

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // const errorText = document.getElementById('error-text');
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(`${localHost}/api/v1/users/register`, {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        
        if(data.msg) {
            // errorText.textContent = data.msg
            setError(data.msg)
        } else {
            localStorage.setItem('token', data.token);
    
            setName("");
            setEmail("");
            setPassword("");
            setError(false);
            navigate('/dashboard');
        }
        setIsLoading(false);
    }

  return (
    <main className='login-cont'>
        <h2 className='login-title'> Register </h2>
        <form onSubmit={handleRegister} className='login-form'>
            <label>Name</label>
            <input 
                className='input-valid'
                type="text" 
                placeholder='enter email'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input 
                className='input-valid'
                type="email" 
                placeholder='enter email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                className='input-valid'
                type="password" 
                placeholder='enter password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button> {isLoading ? 'Registering...' : 'Register'} </button>
        </form>

        <p className='not-a-member'> 
            Already a member? <span> 
                <button onClick={navigateToLogin}> Login </button> 
            </span> 
        </p>

        { error &&  <p id='error-text'>{error}</p>}


    </main>
  )
}

export default Register