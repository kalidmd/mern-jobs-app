
const createJob = async (req, res) => {
    res.send('Job Created')
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