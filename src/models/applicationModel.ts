import { model, Schema, type HydratedDocument, type Types } from "mongoose";

export interface Application {
  job: Types.ObjectId;
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ApplicationDocument = HydratedDocument<Application>;

const applicationSchema = new Schema<Application>(
  {
    job: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    resumeLink: {
      type: String,
      required: [true, "Please add a link to your resume"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please add a cover letter"],
    },
  },
  {
    timestamps: true,
  },
);

const Application = model<Application>("Application", applicationSchema);

export default Application;
