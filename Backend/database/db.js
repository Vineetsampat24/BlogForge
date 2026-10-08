import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Connection Failed ",error.message);
    }
}