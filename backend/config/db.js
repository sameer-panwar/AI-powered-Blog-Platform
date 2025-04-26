const mongoose=require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://sameerpanwar:Sp%40817161@sameersdatabase.gc3nk.mongodb.net/BlogPlatform");
        console.log("MongoDB connected Successfully.")
    }catch(error){
        console.log("MongoDB connection Failed: ", error);
    }
}

module.exports = connectDB;