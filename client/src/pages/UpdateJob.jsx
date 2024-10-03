import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateJob = () => {
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const params = useParams();
    console.log(params);

    const updateJob = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        let result = await fetch(`http://localhost:5000/api/v1/jobs/${params.id}`, {
            method: 'put',
            body: JSON.stringify({  company, position }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();
    }
    return (
    <div className='login-cont'>
        <h2 className='login-title'> Update Job </h2>
        <form onSubmit={updateJob} className='login-form'>
            <label>Company</label>
            <input 
                type="text" 
                placeholder='enter company'
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <label>Position</label>
            <input 
                type="text" 
                placeholder='enter company'
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <button> Edit </button>
        </form>
        <p id='error-text'></p>
    </div>
  )
}

export default UpdateJob