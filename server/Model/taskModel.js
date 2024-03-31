import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    task:String,
    des:String
});

const TaskSchema = mongoose.model("Task", taskSchema);

export default TaskSchema;