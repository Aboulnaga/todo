import CatModel from "../../Model/catModel.js";

export default async function addNewCategoryCN(req, res) {
  const body = req.body;
  try {
    if (!body || body.title === "") {
      return res
        .status(400)
        .json({ success: false, error: "cant add category without title" });
    }

    const newCat = await CatModel.create({ title: body.title });
    // console.log("body", body);
    // console.log(newCat);
    res.status(201).json({ success: true, data: body });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, error: "cant add category without title" });

    throw new Error(`cant add new cat now, ${err.message}`);
  }
}

/**
 * 
  try {
    if (!body || body.title === "") {
      return res
        .status(400)
        .json({ success: false, error: "cant add category without title" });
    }

    const newCat = await CatModel.create(body);
    // console.log("body", body);
    // console.log(newCat);
    res.status(201).json({ success: true, data: body });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, error: "cant add category without title" });

    throw new Error(`cant add new cat now, ${err.message}`);
  }
 */
