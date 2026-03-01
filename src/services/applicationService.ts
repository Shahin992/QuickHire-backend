import { Types } from "mongoose";
import Application, {
  type ApplicationDocument,
} from "../models/applicationModel";
import type { ApplicationInput } from "../types/api";

class ApplicationService {
  async createApplication(
    applicationData: ApplicationInput,
  ): Promise<ApplicationDocument> {
    return Application.create({
      ...applicationData,
      job: new Types.ObjectId(applicationData.job),
    });
  }

  async getApplicationsByJobId(jobId: string): Promise<ApplicationDocument[]> {
    return Application.find({ job: jobId }).populate("job", "title");
  }
}

export default new ApplicationService();
