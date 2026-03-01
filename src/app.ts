import cors from "cors";
import dotenv from "dotenv";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import applicationRoutes from "./routes/applicationRoutes";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

export default app;
