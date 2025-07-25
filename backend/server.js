const express = require("express");
const cors=require("cors");
require('dotenv').config();

const connectDB = require("./config/db")

const app=express();
    
app.use(express.json());
app.use(cors());


connectDB();

app.use("/api/gemini", require("./routes/GiminiRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/postRoutes"));
app.use(require("./routes/userRoutes"));

// app.get('/autoLogin',verifyToken, (req, res)=>{

//     if(!req.user){
//         return res.status(404).json({
//             msg: "User not found"
//         })
//     }

//     res.status(200).json({
//         msg: "You are logged in",
//         success: true
//     })
// })

// app.get('/profile', verifyToken, async (req, res)=>{

//     const email=req.user.email;
//     const user=await userDB.findOne({email});
//     if(!user){
//         return res.status(404).json({msg: "Data not Found"});
//     }

//     res.status(200).json({msg: "Here is your profile", success: true, user})
// })

// app.get('/adminBlogs', verifyToken, async(req, res)=>{
//     const email=req.user.email;

//     const user=await userDB.findOne({email});
    
//     const {username} =user;

//     const adminBlogs=await blogsDB.find({username});

//     res.status(200).json({
//         msg: "Here are the Admin Blogs",
//         success: true,
//         adminBlogs
//     })    
// })

// app.post('/login',async (req, res)=>{
//     try{
//         const {email, password}=req.body;
//         const user=await userDB.findOne({email: email});
//         console.log(user);

//         if(!user){
//             return res.status(404).json({
//                 msg: "User not Found"
//             })
//         }

//         if(user.password !== password){
//             return res.status(404).json({
//                 msg: "Incorrect Password"
//             })
//         }

//         const token=generateToken({email, password});

//         res.status(200).json({
//             msg: "User exist. You are IN",
//             success: true,
//             token,
//             user
//         })
//     }catch(error){
//         console.log("Server Error: ", error);
//         res.status(500).json({
//             msg: "Server Error"
//         });
//     }

// })

// app.post("/signup",async (req, res)=>{
//     const createPayload=req.body;
//     const parsePayload=loginCheck.safeParse(createPayload);
//     if(!parsePayload.success){
//         return res.status(403).json({
//             msg: "Invalid email or password"
//         })
//     }

//     const token=generateToken(createPayload);

//         await userDB.create({
//             username: createPayload.username,
//             email: createPayload.email,
//             password: createPayload.password
//         })

//     res.status(200).json({
//         msg: "Login Successfull", token
//     })
// })


// app.post("/signup/userInfo", verifyToken, async (req, res)=>{
//     const createPayload=req.body;
//     const user=await userDB.findOne({email: req.user.email});
//     if(!user){
//         return res.status(404).json({msg: "User not found"});
//     }

//     await userDB.findByIdAndUpdate(user._id, {
//         name: createPayload.name,
//         role: createPayload.role,
//         bio: createPayload.bio,
//         blogs: 0,
//         likes: 0
//     })

//     res.status(200).json({
//         msg: "User info has been updated"
//     })
// });



// app.post("/postBlog", verifyToken ,async (req, res)=>{
//     const createPayload={
//         ...req.body,
//         keyword: Array.isArray(req.body.keywords) ? req.body.keywords : []};
 
//     const parsePayload=blogCheck.safeParse(createPayload);

//     const user=await userDB.findOne({email: req.user.email});
//     if(!user){
//         return res.status(404).json({msg: "User not found"});
//     }

  
//     if(!parsePayload.success){
//         return res.status(403).json({
//             msg: "Blog post is missing something"
//         });
//     }

//     await blogsDB.create({
//         title: createPayload.title,
//         content: createPayload.content,
//         keyword: createPayload.keywords,
//         name: user.name,
//         role: user.role,
//         username: user.username,
//         likes: 0,
//         likedBy: []
//     })

//     await userDB.findByIdAndUpdate(
//         user._id,
//         {$inc:{blogs: 1}},
//         {new: true}
//     )
//     console.log("posted successfully");
//     res.status(200).json({
//         msg: "Blog has been posted"
//     })
// })



// app.get("/getBlogs",verifyToken, async (req, res)=>{
//     const blogs=await blogsDB.find().sort({createdAt: -1})
//     .populate("comments.postedBy", '_id name')
//     .exec();


//     if(!blogs){
//         return res.status(404).json({msg: "No blogs found"});
//     }

//     const blogData=[];
//     blogs.forEach(element => {
//         data=element;
//         blogData.push(data);
//     });
    
//     res.status(200).json({
//         msg: "Here are the blogs",
//         success: true,
//         data: blogData
//     })
// }
// );


// app.put("/editProfile", async (req, res) => {
//     try {
//         const {id, name, role, bio, username } = req.body;

//         if (!name|| !bio || !role) {
//             return res.status(400).json({ msg: "All fields are required" });
//         }

//         const updatedUser = await userDB.findByIdAndUpdate(
//             id, 
//             { name, role, bio },
//             { new: true }
//         );

//         const updatedBlogs= await blogsDB.updateMany(
//             {username: username},
//             {$set: {name: name , role: role}}
//         );

        

//         if (!updatedUser) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         res.status(200).json({
//             msg: "Profile changes have been saved",
//             success: true,
//             user: updatedUser,
//             blogs: updatedBlogs
//         });
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });


// app.get("/searchUser", verifyToken, async (req, res) => {
//     try {
//         const search =  req.query.searchUser;
//         console.log({serach: search});
//         if (!search) {
//             return res.status(400).json({ msg: "Search field is required" });
//         }

//         const users = await userDB.find({ name: { $regex: search, $options: "i" } });
//         console.log(users);
        
//         const usersData=[];
//         users.forEach(element => {
//             console.log(element.name);
//             data= {
//                 id: element._id,
//                 name: element.name,
//                 role: element.role
//             }
//             usersData.push(data);
//         });

//         console.log(usersData);

//         if (!users) {
//             return res.status(404).json({ msg: "No users found" });
//         }


//         res.status(200).json({
//             msg: "Here are the search results",
//             success: true,
//             users: usersData
//         });
//     } catch (error) {
//         console.error("Error searching for user:", error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });

// app.post("/updateLike", verifyToken, async (req, res)=>{
//     const blogID=req.body.blogId;
//     const user = req.user._id;
    

//     try{
//         const blog = await blogsDB.findById(blogID);

//         if(!blog){
//             res.status(404).json({msg: "Blog not found"});
//         }
//         const isLiked = blog?.likedBy?.includes(user);


//         let updatedData;

//         if (isLiked) {
//             updatedData = await blogsDB.findByIdAndUpdate(
//                 blogID,
//                 {
//                 $inc: { likes: -1 },
//                 $pull: { likedBy: user },
//                 },
//                 { new: true }
//         );
//         console.log("unliked");
//         } else {
//             updatedData = await blogsDB.findByIdAndUpdate(
//                 blogID,
//                 {
//                 $inc: { likes: 1 },
//                 $push: { likedBy: user },
//                 },
//                 { new: true }
//             );
//         console.log("Liked");
//         }
//         console.log(updatedData);

//         res.status(200).json({
//             msg: "Blog is Updated!",
//             data: updatedData
//         })

//     }catch(err){
//         console.log("Error occcured", err);
//         res.status(400).json({msg: err})
//     } 
// });


const port = process.env.PORT;

app.listen(port, ()=>{
    console.log("listening to port 3000");
})