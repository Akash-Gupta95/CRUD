import express from "express";
import { deleteTask, editTask, getTask, getTaskOne, taskAdd } from "../Controllers/taskControl.js";


const Router = express.Router();
Router.use(express.json());


Router.get("/task", getTask)

Router.get("/taskOne/:id", getTaskOne)

Router.post("/test",taskAdd )

Router.put("/editTask", editTask)

Router.delete("/deleteTask", deleteTask)

export default Router;