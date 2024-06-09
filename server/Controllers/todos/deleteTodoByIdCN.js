import TodoModel from "../../Model/todoModel.js";

export default async function deleteTodoByIdCN(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, data: "id not found" });
    }

    const delTodo = await TodoModel.findByIdAndDelete(id);

    if (!delTodo)
      return res.status(400).json({ success: false, data: "todo not found" });
    console.log(delTodo);
    res.status(200).json({ success: true, data: delTodo });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, data: "error deleting todo" });
  }
}
