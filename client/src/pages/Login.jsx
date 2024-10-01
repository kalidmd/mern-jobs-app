import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
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

        let result = await fetch('http://localhost:5000/api/v1/users/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();

        localStorage.setItem('token', result.token)
        // const data = { email, password }
        // console.log(data);
        if( result.msg) {
            localStorage.removeItem('token');
            errorText.textContent = result.msg;
        }else {
            errorText.textContent = '';
            navigate('/dashboard');
        }
        // console.log(result.msg);

        setEmail("");
        setPassword("");
        // navigate('/dashboard'); 
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
            <button> Submit </button>
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