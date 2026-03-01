import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import jobService from "../services/jobService";
import type { JobFilters, JobInput } from "../types/api";

const getJobs = asyncHandler(
  async (
    req: Request<{}, {}, {}, JobFilters>,
    res: Response,
  ) => {
    const { title, location, category } = req.query;
    const jobs = await jobService.getAllJobs({ title, location, category });
    res.json(jobs);
  },
);

const getJobById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const job = await jobService.getJobById(req.params.id);

    if (job) {
      res.json(job);
      return;
    }

    res.status(404);
    throw new Error("Job not found");
  },
);

const createJob = asyncHandler(
  async (req: Request<{}, {}, JobInput>, res: Response) => {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  },
);

const deleteJob = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const success = await jobService.deleteJob(req.params.id);

    if (success) {
      res.json({ message: "Job removed" });
      return;
    }

    res.status(404);
    throw new Error("Job not found");
  },
);

export { createJob, deleteJob, getJobById, getJobs };
