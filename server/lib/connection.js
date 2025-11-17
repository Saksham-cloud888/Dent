import mongoose from "mongoose";

/**
 * Function that connects to the mongodb database
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sakshampdl443_db_user:%3C%23Saksham%40123%3E@cluster0.rqdbgfy.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
