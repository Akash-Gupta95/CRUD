import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



// MongoDB Connection
const DB_Connection = mongoose.connect(process.env.DBConn).then(()=>{
    console.log("DataBase Is connected");
}).catch((Error)=>{
    console.log(Error)
})

export default DB_Connection;