import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import Test from '../components/Test';

const UpdateJob = () => {
    // const APIUrl = 'https://mern-jobs-app-llm4.onrender.com';
      const localHost = 'http://localhost:5000';

    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState(undefined);
    const [options] =useState(['pending', 'interview', 'declined']);
    const [updated, setUpdated] = useState(undefined);
    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        const getSingleJob = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${localHost}/api/v1/jobs/${params.id}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json();

            setCompany(data.job.company);
            setPosition(data.job.position);
            setStatus(data.job.status);
        }

        getSingleJob();
    }, [params])
        

    const updateJob = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();

        await fetch(`${localHost}/api/v1/jobs/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ company, position, status }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        setUpdated(true);
        setTimeout(() => {
            setUpdated(false);
            navigate('/dashboard');
        }, 1000);
    }

    return (
    <div className='login-cont update-cont'>
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
            <label>Status</label>
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className='status-select'
            >
                {
                    options.map((option, index) => {
                        return (
                            <option key={index}> {option} </option>
                        )
                    })
                }
            </select>
            
            <button> Edit </button>
        </form>
        {updated && <p id='success-text'> Job Edited! </p>}
    </div>
  )
}

export default UpdateJob