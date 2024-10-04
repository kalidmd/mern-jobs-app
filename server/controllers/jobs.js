const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../error');

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
    const { userId } = req.user

    const job = await Job.find({ createdBy: userId }).sort('-createdAt');
    if(job.length < 1) {
        throw new NotFoundError('No Job Found');
    }
    res.status(StatusCodes.OK).json({ count: job.length, job });

}

const getSingleJob = async (req, res) => {
    const { params: {id: jobId}, user: {userId}  } = req;
    
    const job = await Job.findOne({ _id:  jobId, createdBy: userId})

    if(!job) {
        throw new NotFoundError(`No Job Found With Id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job });
}

const updateJob = async (req, res) => {
    const { params: {id: jobId}, user: {userId}  } = req;

    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId },  req.body, { new: true, runValidators: true })

    if(!job) {
        throw new NotFoundError(`No Job Found With Id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });

}

const deleteJob = async (req, res) => {
    const {params: {id: jobId}, user: {userId} } = req;
    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

    if(!job) {
        throw new NotFoundError(`No Job Found With Id ${jobId}`);
    }
    
    res.status(StatusCodes.OK).json({ job, company: job.company });
}

module.exports = { 
    createJob, 
    getJobs, 
    getSingleJob,
    updateJob,
    deleteJob  
}