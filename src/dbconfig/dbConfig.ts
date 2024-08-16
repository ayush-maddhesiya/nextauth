import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("process.env.MONGODB_URI");
    
    // Set up event listeners before attempting to connect
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log("Mongoose connected successfully");
    });

    connection.on('error', (error) => {
      console.log("Mongoose connection error: " + error);
    });

    connection.on('disconnected', () => {
      console.log("Mongoose disconnected");
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);

  } catch (error) {
    console.log("Something went wrong during connection: " + error);
  }
}
