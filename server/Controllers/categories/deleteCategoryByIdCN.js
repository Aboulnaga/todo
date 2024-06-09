import CatModel from "../../Model/catModel.js";

export default async function deleteCategoryByIdCN(req, res) {
  const id = req.params.id;

  const isResult = await CatModel.findById(id);

  if (!isResult) {
    return res.status(400).json({ success: false, error: "no category found" });
  }

  const delRes = await CatModel.findByIdAndDelete(id);

  res.status(200).json({ success: true, data: delRes });
}
