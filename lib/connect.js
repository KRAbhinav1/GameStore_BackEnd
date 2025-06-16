import mongoose from "mongoose";

export const dbConnection = () => {
  const connectionString = process.env.DATABASE;

  mongoose.connect(connectionString).then(() => {
      console.log("MongoDB atlas connected successfully");
    })
    .catch((error) => {
      console.log("MongoDB connection error", error);
    });
};

