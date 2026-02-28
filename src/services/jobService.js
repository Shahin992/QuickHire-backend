const Job = require('../models/jobModel');

class JobService {
    async getAllJobs(filters = {}) {
        const query = {};
        if (filters.title) {
            query.title = { $regex: filters.title, $options: 'i' };
        }
        if (filters.location) {
            query.location = { $regex: filters.location, $options: 'i' };
        }
        if (filters.category) {
            query.category = filters.category;
        }
        return await Job.find(query).sort({ createdAt: -1 });
    }

    async getJobById(id) {
        return await Job.findById(id);
    }

    async createJob(jobData) {
        return await Job.create(jobData);
    }

    async deleteJob(id) {
        const job = await Job.findById(id);
        if (job) {
            await job.deleteOne();
            return true;
        }
        return false;
    }
}

module.exports = new JobService();
