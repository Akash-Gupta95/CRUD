import mongoose from "mongoose"
import express from "express";
import TaskModel from "../Model/taskModel.js"
import DB_Connection from "../DB/DataBaseConn.js";

export const getTask= async (req, res)=>{
const task = await TaskModel.find();

res.status(200).json(task)


}

export const taskAdd = async (req, res)=>{

    try{
       // Extract task and des from request body
       const { task, des } = req.body;
    
        // Create a new task document
        const newTask = new TaskModel({ task, des });

        // Save the new task to the database
        const savedTask = await newTask.save();

          // Send a success response with the inserted data
          res.status(200).json({ message: 'Task added successfully', task: savedTask });


        } catch (error) {
            // Log the error for debugging
            console.error('Error adding task:', error);
            // Send an error response
            res.status(500).json({ error: 'Internal Server Error' });
        }


   
}

export const editTask = async (req, res) => {
    try {
        // Extract task ID and updated data from request body
        const { taskId, updatedTask, updatedDes } = req.body;

        // Validate data (you can add more validation as needed)
        if (!taskId || (!updatedTask && !updatedDes)) {
            return res.status(400).json({ error: 'Task ID and at least one updated field are required' });
        }

        // Find the task by ID and update it
        const updatedTaskData = {};
        if (updatedTask) updatedTaskData.task = updatedTask;
        if (updatedDes) updatedTaskData.des = updatedDes;

        const updatedTaskDocument = await TaskModel.findByIdAndUpdate(
            taskId,
            { $set: updatedTaskData },
            { new: true } // return the updated document
        );

        // Check if the task was found and updated
        if (!updatedTaskDocument) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Send a success response with the updated task data
        res.status(200).json({ message: 'Task updated successfully', task: updatedTaskDocument });
    } catch (error) {
        // Log the error for debugging
        console.error('Error updating task:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteTask = async(req, res)=>{
   try{
    const {id} = req.body;
    // const deleteTask = TaskModel.findByIdAndDelete({_id:id});
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    res.status(200).json({message:"Task has been deletd", deletedTask});
   }catch{
     // Log the error for debugging
     console.error('Error Deleting task:', error);
     // Send an error response
     res.status(500).json({ error: 'Internal Server Error' });
   }


}

export const getTaskOne1 = async (res, req)=>{
    try{
        const {id}= req.params;

        const getOneTask = await TaskModel.findById(id);

        res.status(200).json({message: "One Task Fetch",task:getOneTask})


    }catch(error){
      // Log the error for debugging
      console.error('Error finding task:', error);
      // Send an error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getTaskOne = async (req, res) => {
    try {
        const { id } = req.params;

        const getOneTask = await TaskModel.findById(id);

        if (!getOneTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: "One Task Fetched", task: getOneTask });
    } catch (error) {
        // Log the error for debugging
        console.error('Error finding task:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
