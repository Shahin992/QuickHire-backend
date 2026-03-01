import asyncHandler from "express-async-handler";
import type { Request, RequestHandler, Response } from "express";
import applicationService from "../services/applicationService";
import type { ApplicationInput } from "../types/api";

const submitApplication: RequestHandler = asyncHandler(
  async (req: Request<{}, {}, ApplicationInput>, res: Response) => {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json(application);
  },
);

export { submitApplication };
