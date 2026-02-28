const asyncHandler = require('express-async-handler');
const jobService = require('../services/jobService');

/**
 * @desc    Get all jobs
 * @route   GET /api/jobs
 * @access  Public
 */
const getJobs = asyncHandler(async (req, res) => {
    const { title, location, category } = req.query;
    const jobs = await jobService.getAllJobs({ title, location, category });
    res.json(jobs);
});

/**
 * @desc    Get job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
const getJobById = asyncHandler(async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    if (job) {
        res.json(job);
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

/**
 * @desc    Create a job
 * @route   POST /api/jobs
 * @access  Private/Admin (Simulated)
 */
const createJob = asyncHandler(async (req, res) => {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
});

/**
 * @desc    Delete a job
 * @route   DELETE /api/jobs/:id
 * @access  Private/Admin (Simulated)
 */
const deleteJob = asyncHandler(async (req, res) => {
    const success = await jobService.deleteJob(req.params.id);
    if (success) {
        res.json({ message: 'Job removed' });
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

module.exports = {
    getJobs,
    getJobById,
    createJob,
    deleteJob,
};
