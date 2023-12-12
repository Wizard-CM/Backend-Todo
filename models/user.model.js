import mongoose from "mongoose";
  
  // Creating a schema Model
  const user_Schema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique:true
      },
      password:{
        type:String,
        required: true,
        select:true
      }
    },
    { timestamps: true }
  );
  
  // Creating a Model
  export const user_Model = mongoose.model("user_Model", user_Schema);