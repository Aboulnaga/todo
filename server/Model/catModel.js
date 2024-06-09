import mongoose, { Schema } from "mongoose";

const catSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CatModel = mongoose.model("categories", catSchema);
export default CatModel;
