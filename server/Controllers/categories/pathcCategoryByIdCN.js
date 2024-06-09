import CatModel from "../../Model/catModel.js";

export default async function pathcCategoryByIdCN(req, res) {
  const { id } = req.params;
  const title = req.body.title;
  if (!title || title === "") {
    return res.status(400).json({ success: false, error: "title is empty!" });
  }
  const findAndUpdateCat = await CatModel.findByIdAndUpdate(
    id,
    {
      title: title,
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    data: { ...findAndUpdateCat["_doc"], new_title: title },
  });
}
