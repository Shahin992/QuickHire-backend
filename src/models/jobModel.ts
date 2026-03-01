import { model, Schema, type HydratedDocument } from "mongoose";

export interface Job {
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: string;
  category: string;
  logo?: string;
  logoColor?: string;
  tag2?: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JobDocument = HydratedDocument<Job>;

const jobSchema = new Schema<Job>(
  {
    title: {
      type: String,
      required: [true, "Please add a job title"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    jobType: {
      type: String,
      required: [true, "Please add a job type"],
    },
    salary: {
      type: String,
      default: "Not Specified",
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    logo: { type: String },
    logoColor: { type: String },
    tag2: { type: String },
    description: {
      type: String,
      required: [true, "Please add a job description"],
    },
  },
  {
    timestamps: true,
  },
);

const Job = model<Job>("Job", jobSchema);

export default Job;
