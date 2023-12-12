import mongoose from "mongoose";

// Creating a schema Model
const task_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default:false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_Model",
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a Model
export const task_Model = mongoose.model("task_Model", task_Schema);
