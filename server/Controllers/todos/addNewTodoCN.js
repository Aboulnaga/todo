import TodoModel from "../../Model/todoModel.js";

export default async function addNewTodoCN(req, res) {
  const body = req.body;
  console.log(body);
  if (!body || body.title === "") {
    return res
      .status(400)
      .send({ success: false, error: "todo title is required" });
  }
  const newTodo = await TodoModel.create(body);
  res.status(201).send({ success: true, data: newTodo });
}
