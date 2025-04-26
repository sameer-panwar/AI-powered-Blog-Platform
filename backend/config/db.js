const mongoose=require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.Database_URL);
        console.log("MongoDB connected Successfully.")
    }catch(error){
        console.log("MongoDB connection Failed: ", error);
    }
}

module.exports = connectDB;