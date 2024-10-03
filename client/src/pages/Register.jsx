import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const errorText = document.getElementById('error-text');
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        
        let result = await fetch('http://localhost:5000/api/v1/users/register', {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();
        
        if(result.msg) {
            errorText.textContent = result.msg
        } else {
            localStorage.setItem('token', result.token);
            const data = { name, email, password }
            console.log(data);
            console.log(result);
    
            setName("");
            setEmail("");
            setPassword("");
            navigate('/dashboard');
        }
    }

  return (
    <main className='login-cont'>
        <h2 className='login-title'> Register </h2>
        <form onSubmit={handleRegister} className='login-form'>
            <label>Name</label>
            <input 
                type="text" 
                placeholder='enter email'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button> Register </button>
        </form>

        <p className='not-a-member'> 
            Already a member? <span> 
                <button onClick={navigateToLogin}> Login </button> 
            </span> 
        </p>

        <p id='error-text'></p>

    </main>
  )
}

export default Register