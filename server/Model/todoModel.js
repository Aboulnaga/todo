import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const todoStatus = ["pending", "completed", "timeOut"];
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "todo title is requried"],
    },

    desc: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: todoStatus,
      required: true,
      default: "pending",
    },

    catId: {
      type: ObjectId,
      ref: "categories",
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("todos", todoSchema);
export default TodoModel;
