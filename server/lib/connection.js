import mongoose from "mongoose";

/**
 * Function that connects to the mongodb database
 */
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sakshampdl443_db_user:<db_password>@cluster0.rqdbgfy.mongodb.net/?appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
