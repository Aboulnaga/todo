import TodoModel from "../../Model/todoModel.js";

export default async function updateTodoByIdCN(req, res) {
  const { id } = req.params;
  console.log("req body", req.body);
  const title = req.body.title;
  const body = req.body;

  try {
    if (!id || !title) {
      return res.status(400).json({ success: false, data: "no id or title" });
    }

    const upateTodo = await TodoModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // console.log(upateTodo);

    res.status(201).json({ success: true, data: upateTodo });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, data: "no user found" });
  }
}
