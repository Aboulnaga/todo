import CatModel from "../../Model/catModel.js";
export default async function getAllCatsCN(req, res) {
  const data = await CatModel.find();

  console.log(data);

  if (data.length < 1) {
    return res.status(200).json({
      success: false,
      data: {
        error: "no categories",
      },
    });
  }

  res.status(200).json({
    success: true,
    data,
  });
}
