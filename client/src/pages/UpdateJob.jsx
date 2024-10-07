import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateJob = () => {
    // const APIUrl = 'https://mern-jobs-app-llm4.onrender.com';
    const localHost = 'http://localhost:5000';

    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState(undefined);
    const [options] =useState(['pending', 'interview', 'declined']);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        const getSingleJob = async () => {
            const token = localStorage.getItem('token');
            setIsLoading(true);
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
            setIsLoading(false);
        }

        getSingleJob();
    }, [params])
        

    const updateJob = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        setIsLoadingUpdate(true);

        await fetch(`${localHost}/api/v1/jobs/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ company, position, status }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
         
        setTimeout(() => {
            setIsLoadingUpdate(false);
            navigate('/dashboard');
        }, 1000);

    }

    return (
        <div className='login-cont update-cont'>
            <h2 className='login-title'> Update Job </h2>
            {
                isLoading && 
                <div className="loading">
                    <div className="loading-ring"></div>
                </div>
            }
           { 
                !isLoading &&
                <form onSubmit={updateJob} className='login-form'>
                        <label>Company</label>
                        <input 
                            className='input-valid'
                            type="text" 
                            placeholder='enter company'
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <label>Position</label>
                        <input 
                            className='input-valid'
                            type="text" 
                            placeholder='enter position'
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
                        
                        <button>  {isLoadingUpdate ? 'Updating...' : 'Edit' } </button>
                    </form>}
            {/* {updated && <p id='success-text'> Job Edited! </p>} */}
        </div>
    )
}

export default UpdateJob