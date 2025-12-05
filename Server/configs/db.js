import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ MongoDB Connected")
    );

    mongoose.connection.on("error", (err) =>
      console.log("❌ MongoDB Error:", err)
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "StayHere",
    });
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
  }
};

export default connectDB;
