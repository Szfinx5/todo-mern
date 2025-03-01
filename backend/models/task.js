import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    priority: { type: Number, required: true, min: 1, max: 3 },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Task || mongoose.model("Task", taskSchema);
