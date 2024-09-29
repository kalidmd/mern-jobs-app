import React from 'react'

const Dashboard = () => {
  return (
    <main className='login-cont'>
    <h2 className='login-title'> New Job </h2>
    <form className='login-form'>
        <label>Company</label>
        <input 
            type="text" 
            placeholder='enter company'
        />
        <label>Position</label>
        <input 
            type="text" 
            placeholder='enter company'
        />
        <button> Submit </button>
    </form>
</main>
  )
}

export default Dashboard