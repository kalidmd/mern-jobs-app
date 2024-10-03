import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const errorText = document.getElementById('error-text'); 
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getJobs();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    let result = await fetch('http://localhost:5000/api/v1/jobs', {
      method: 'post',
      body: JSON.stringify({company, position}),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    result = await result.json();
    // 08:38:57

    if (result.msg) {
      errorText.textContent = result.msg
    } else {
      errorText.textContent = '';
    }
    setCompany('');
    setPosition('');
  }

  const getJobs = async () => {
    const token = localStorage.getItem('token');

    let result = await fetch('http://localhost:5000/api/v1/jobs', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    result = await result.json();
    setJobs(result.job);
  }

  const editJob = async (id) => {
    navigate('/edit')
  }


  return (
    <main className='dashboard-main'>
      <div className='login-cont'>
        <h2 className='login-title'> New Job </h2>
        <form onSubmit={createJob} className='login-form'>
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
            <button> Submit </button>
        </form>
        <p id='error-text'></p>
    </div>

    <div className='jobs-cont'>
      {
        jobs.map((item) => {
          return (
              <div key={item._id} className='jobs'>
                <div className="jobs-left-side">
                  <p id='position-text'> {item.position} </p>
                  <p id='company-text'> {item.company} </p>
                  <div>
                    <button onClick={editJob} >Edit</button>
                    <button>Delete</button>

                  </div>
                </div>

                <div className='jobs-right-side'>
                  <p id='date-text'> {item.createdAt} </p>
                  <p id='status-text'> {item.status} </p>
                </div>
              </div>
          )
        })
      }
    </div>
  </main>
  )
}

export default Dashboard