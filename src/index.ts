import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  });
});
