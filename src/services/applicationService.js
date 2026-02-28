const Application = require('../models/applicationModel');

class ApplicationService {
    async createApplication(applicationData) {
        return await Application.create(applicationData);
    }

    async getApplicationsByJobId(jobId) {
        return await Application.find({ job: jobId }).populate('job', 'title');
    }
}

module.exports = new ApplicationService();
