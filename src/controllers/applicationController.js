const asyncHandler = require('express-async-handler');
const applicationService = require('../services/applicationService');

/**
 * @desc    Submit a job application
 * @route   POST /api/applications
 * @access  Public
 */
const submitApplication = asyncHandler(async (req, res) => {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json(application);
});

module.exports = {
    submitApplication,
};
