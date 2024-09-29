const express = require('express');
const router = express.Router();
const { 
    createJob, 
    getJobs, 
    getSingleJob, 
    updateJob, 
    deleteJob 
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getJobs);
router.route('/:id').get(getSingleJob).put(updateJob).delete(deleteJob);

module.exports = router;