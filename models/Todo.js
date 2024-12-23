import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 1 },
    description: { type: String, required: true, minLength: 1 },
    status: { type: Boolean, default: false },
    timestamp: { type: Date, default: () => Date.now(), immutable: true },
  },
  { collection: "todos" }
);

export const Todo = mongoose.model("Todo", TodoSchema);
