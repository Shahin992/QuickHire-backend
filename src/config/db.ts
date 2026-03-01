import mongoose from "mongoose";

let connectionPromise: Promise<mongoose.Connection> | null = null;

const buildMongoUri = (): string => {
  if (process.env.DB_URI) {
    return process.env.DB_URI;
  }

  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  const username = process.env.DB_USERNAME || process.env.DB_USER;
  const password = process.env.DB_PASS;
  const dbName = process.env.DB_NAME;

  if (!username || !password || !dbName) {
    throw new Error(
      "Missing MongoDB credentials. Set DB_URI or MONGODB_URI or DB_USERNAME/DB_PASS/DB_NAME.",
    );
  }

  return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.c60ctk1.mongodb.net/${encodeURIComponent(dbName)}?retryWrites=true&w=majority&appName=Cluster0`;
};

const connectDB = async (): Promise<mongoose.Connection> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  mongoose.set("strictPopulate", false);
  mongoose.set("autoIndex", true);
  mongoose.set("bufferCommands", false);

  const uri = buildMongoUri();

  connectionPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: Number(
        process.env.DB_SERVER_SELECTION_TIMEOUT_MS || 10000,
      ),
      connectTimeoutMS: Number(process.env.DB_CONNECT_TIMEOUT_MS || 10000),
      socketTimeoutMS: Number(process.env.DB_SOCKET_TIMEOUT_MS || 20000),
    })
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.name}`);
      return conn.connection;
    })
    .catch((error: unknown) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
};

export default connectDB;
