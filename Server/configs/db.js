import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hotel-booking",
      serverSelectionTimeoutMS: 5000, // ⬅️ important
    });

    console.log("✅ Database Connected");

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
