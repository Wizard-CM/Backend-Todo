import mongoose from "mongoose"

// Connecting a database
export const connectdb = async ()=>{
    try {
      const databaseObj = await mongoose.connect(process.env.MONGO_URI.toString(), {
        dbName: "Backend_Todo",
      });
      console.log(`Database connected at : ${databaseObj.connection.port}`);
    } catch (error) {
      console.log(error);
    }
  }
