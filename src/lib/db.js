import mongoose from "mongoose";
const isConnected = mongoose.connection.readyState === 1 ? true : false;

if (isConnected) {
  return true;
} else {
  try {
    mongoose.connect(process.env.MONGO_URI);
    return true;
  } catch (err) {
    console.error("Something went wrong connecting Database", err);
    throw new Error("Database not connected");
  }
}
