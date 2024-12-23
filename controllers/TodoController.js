import { Todo } from "../models/Todo.js";

//ready all todo items
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ "Error:": error });
  }
};

export const postTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    const alltodos = await Todo.find();

    res.status(201).json({
      message: "sucessfully added newTodo and updated the database",
      newTodo,
      alltodos,
    });
  } catch (error) {
    res.status(500).json({ "Error: ": error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found." });
    }

    todo.status = !todo.status;
    await todo.save();

    res.status(200).json({ updatedTodo: todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
