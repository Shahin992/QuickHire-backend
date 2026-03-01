import Job from "../models/jobModel";
import type { JobFilters, JobInput } from "../types/api";

type JobQuery = Record<string, unknown>;

class JobService {
  async getAllJobs(filters: JobFilters = {}) {
    const query: JobQuery = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }

    if (filters.location) {
      query.location = { $regex: filters.location, $options: "i" };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    return Job.find(query).sort({ createdAt: -1 });
  }

  async getJobById(id: string) {
    return Job.findById(id);
  }

  async createJob(jobData: JobInput) {
    return Job.create(jobData);
  }

  async deleteJob(id: string): Promise<boolean> {
    const job = await Job.findById(id);

    if (job) {
      await job.deleteOne();
      return true;
    }

    return false;
  }
}

export default new JobService();
