import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from "./routes/route.js"
import user from "./routes/user.js"
import { connectDB } from './database/db.js';

const app=express();
dotenv.config()

// database
connectDB()

// routing
app.use(cors())
app.use(express.json())
app.use("/api",routes)
app.use("/api",user)

const PORT=process.env.PORT
console.log(PORT);

app.listen(PORT,()=>{
    console.log(`Server Is Running On PORT ${PORT}`);
})