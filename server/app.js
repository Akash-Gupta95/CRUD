import express from "express";
import bodyParser from "body-parser";
import taskModel from "./Model/taskModel.js";
import DB_Connection from "./DB/DataBaseConn.js";

import Routes from "./Routes/taskRoutes.js"
const app = express();
const PORT = 4012;


// Middleware
app.use(("/api"),Routes);
app.use(express.json())



app.listen(PORT, (req, res)=>{
    console.log("Server Connected On Port: ", PORT)
})


