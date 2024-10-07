import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // const APIUrl = 'https://mern-jobs-app-llm4.onrender.com';
  const localHost = 'http://localhost:5000';

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState(false);
  // const errorText = document.getElementById('error-text'); 
  const [jobs, setJobs] = useState([]);
  // const [companyName, setCompanyName] =useState(undefined);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingGet, setIsLoadingGet] = useState(false);
  
  const navigate = useNavigate();
  // const deletedJob = document.getElementById('deleted-job');

  useEffect(() => {
    getJobs();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setIsLoadingCreate(true);
    const response = await fetch(`${localHost}/api/v1/jobs`, {
      method: 'post',
      body: JSON.stringify({company, position}),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    // 08:38:57
    setIsLoadingCreate(false);

    if (data.msg) {
      setError(data.msg)
    } else {
      setError(false);
      // errorText.textContent = '';
    }
    setCompany('');
    setPosition('');
    getJobs();
  }

  const getJobs = async () => {
    const token = localStorage.getItem('token');
    setIsLoadingGet(true);
    const response = await fetch(`${localHost}/api/v1/jobs`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    setJobs(data.job);

    setIsLoadingGet(false)
  }

  const editJob = (id) => {
    navigate(`/edit/${id}`)
  }

  const deleteJob = async (id, company) => {
    const token = localStorage.getItem('token');
    await fetch(`${localHost}/api/v1/jobs/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    // const data = await response.json();
    // console.log(data.company);
    // setCompanyName(data.company)
    getJobs();

  }


  return (
    <main className='dashboard-main'>
      <div className='login-cont'>
        <h2 className='login-title'> Create New Job </h2>
        <form onSubmit={createJob} className='login-form'>
            <label>Company</label>
            <input 
                className={error ? 'input-error': 'input-valid'}
                type="text" 
                placeholder='enter company'
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <label>Position</label>
            <input 
                className={error ? 'input-error': 'input-valid'}
                type="text" 
                placeholder='enter company'
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <button> {isLoadingCreate ? 'Creating Job...' : 'Add'} </button>
        </form>

        { error &&  <p id='error-text'>{error}</p>}

        
    </div>

    {
      isLoadingGet && 
        <div className="loading">
          <div className="loading-ring"></div>
        </div>
    }

    { !isLoadingGet && <div>
      {
        jobs ?
        <h1 className='jobs-length'>

          You've <span> { jobs.length } </span> Job(s)
        </h1> :

        <h1 className='jobs-length'>
          <span> No </span> Job Found
        </h1>
      }
      <div 
        className='jobs-cont'  
        style={{
          justifyContent: jobs && jobs.length === 1 ? 
          'center': 'space-between'}}
      >
        {
          jobs && jobs.map((item) => {
            return (
              <div key={item._id} className='jobs'>
                <div className="jobs-left-side">
                  <p id='position-text'> {item.position} </p>
                  <p id='company-text'> {item.company} </p>
                  <div className='jobs-btn'>
                    <button 
                      className='jobs-edit-btn' 
                      onClick={() => editJob(item._id)}
                    >
                      Edit
                    </button>
                    <button 
                      className='jobs-dlt-btn'
                      onClick={() => deleteJob(item._id, item.company)}
                    >
                      Delete
                    </button>

                  </div>
                </div>

                <div className='jobs-right-side'>
                  <p id='date-text'> {item.createdAt} </p>
                  <p id='status-text'> {item.status.toUpperCase()} </p>
                </div>
              </div>
            ) 
          })
        }
      </div>
    </div>}
    
  </main>
  )
}

export default Dashboard