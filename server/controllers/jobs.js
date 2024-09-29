const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');

const createJob = async (req, res) => {
    const job = await Job.create({ 
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
        createdBy: req.user.userId
     })

    res.status(StatusCodes.CREATED).json({ job })
}

const getJobs = async (req, res) => {
    res.send('Get All Jobs')
}

const getSingleJob = async (req, res) => {
    res.send('Single Job')
}

const updateJob = async (req, res) => {
    res.send('Update Job')
}

const deleteJob = async (req, res) => {
    res.send('Delete Job')
}

module.exports = { 
    createJob, 
    getJobs, 
    getSingleJob,
    updateJob,
    deleteJob  
}