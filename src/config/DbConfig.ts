import mongoose from "mongoose";

export async function connectDB() {
    try {
        const mongoUrl = process.env.mongourl || "";
        await mongoose.connect(mongoUrl);
        console.log("MongoDB Connection Successfull");
    } catch (error) {
        console.log(error);
    }
}