import mongoose from "mongoose";

/**
 * Function that connects to the mongodb database
 */
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/dent", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
