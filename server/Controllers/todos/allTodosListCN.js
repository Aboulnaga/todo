import TodoModel from "../../Model/todoModel.js";

export default async function allTodosListCN(req, res) {
  const todos = await TodoModel.find().populate("catId", "title");

  res.status(200).json({
    success: true,
    data: todos,
  });
}
