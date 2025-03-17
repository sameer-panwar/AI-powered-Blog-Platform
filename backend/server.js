const express=require("express");
const cors=require("cors");
const jwt=require("jsonwebtoken");
const { loginCheck, blogCheck } = require("./type");
const { userDB, blogsDB } = require("./db");


const app=express();

app.use(express.json());
app.use(cors());

const secretkey="2400424";

function generateToken(createPayload){
    const token=jwt.sign({email: createPayload.email, password: createPayload.password}, secretkey);
    return token;
}

const verifyToken=async (req, res, next)=>{
    const token=req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token provided" }); 
    }

    jwt.verify(token, secretkey,(err, decoded)=>{
        if(err){
            console.log("not valid token");
            return res.status(401).json({error: "Invalid token"})
        }

        console.log("valid token", decoded);
        req.user=decoded;
        next();

    })
}

app.get('/autoLogin',verifyToken, (req, res)=>{

    if(!req.user){
        return res.status(404).json({
            msg: "User not found"
        })
    }

    res.status(200).json({
        msg: "You are logged in",
        success: true
    })
})

app.get('/profile', verifyToken, async (req, res)=>{
   
    //res.send(req.user.email);
    const email=req.user.email;
    const user=await userDB.findOne({email});
    if(!user){
        return res.status(404).json({msg: "Data not Found"});
    }

    res.status(200).json({msg: "Here is your profile", success: true, user})
})

app.get('/adminBlogs', verifyToken, async(req, res)=>{
    const email=req.user.email;
 

    const user=await userDB.findOne({email});
    const {name} =user;

    const adminBlogs=await blogsDB.find({name});

    res.status(200).json({
        msg: "Here are the Admin Blogs",
        success: true,
        adminBlogs
    })    
})

app.post('/login',async (req, res)=>{
    const {email, password}=req.body;
    const user=await userDB.findOne({email, password});


    if(!user){
        return res.status(404).json({
            msg: "User not Found"
        })
    }

    const token=generateToken({email, password});

    res.status(200).json({
        msg: "User exist. You are IN",
        success: true,
        token,
        user
    })

})

app.post("/signup",async (req, res)=>{
    const createPayload=req.body;
    const parsePayload=loginCheck.safeParse(createPayload);
    if(!parsePayload.success){
        return res.status(403).json({
            msg: "Invalid email or password"
        })
    }

    const token=generateToken(createPayload);

        await userDB.create({
            username: createPayload.username,
            email: createPayload.email,
            password: createPayload.password
        })

    res.status(200).json({
        msg: "Login Successfull", token
    })
})

app.post("/signup/userInfo", verifyToken, async (req, res)=>{
    const createPayload=req.body;
    const user=await userDB.findOne({email: req.user.email});
    if(!user){
        return res.status(404).json({msg: "User not found"});
    }

    await userDB.findByIdAndUpdate(user._id, {
        name: createPayload.name,
        role: createPayload.role,
        bio: createPayload.bio,
        blogs: 0,
        likes: 0
    })

    res.status(200).json({
        msg: "User info has been updated"
    })
});


app.post("/postBlog", verifyToken ,async (req, res)=>{
    const createPayload={
        ...req.body,
        keyword: Array.isArray(req.body.keywords) ? req.body.keywords : []};
 
    const parsePayload=blogCheck.safeParse(createPayload);

    const user=await userDB.findOne({email: req.user.email});
    if(!user){
        return res.status(404).json({msg: "User not found"});
    }

  
    if(!parsePayload.success){
        return res.status(403).json({
            msg: "Blog post is missing something"
        });
    }

    await blogsDB.create({
        title: createPayload.title,
        content: createPayload.content,
        keyword: createPayload.keywords,
        name: user.name,
        role: user.role,
        likes: 0
    })

    await userDB.findByIdAndUpdate(
        user._id,
        {$inc:{blogs: 1}},
        {new: true}
    )
    console.log("posted successfully");
    res.status(200).json({
        msg: "Blog has been posted"
    })
})

app.get("/getBlogs",verifyToken, async (req, res)=>{
    const blogs=await blogsDB.find();


    if(!blogs){
        return res.status(404).json({msg: "No blogs found"});
    }

    const blogData=[];
    blogs.forEach(element => {
        data=element;
        blogData.push(data);
    });
    
    console.log(blogData);
    res.status(200).json({
        msg: "Here are the blogs",
        success: true,
        data: blogData
    })
}
);


app.put("/editProfile", async (req, res) => {
    try {
        const { id, name, username, bio, role } = req.body;

        if (!id || !name || !username || !bio || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const updatedUser = await userDB.findByIdAndUpdate(
            id, 
            { name, username, bio, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "Profile changes have been saved",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


app.get("/searchUser", verifyToken, async (req, res) => {
    try {
        const search =  req.query.searchUser;
        console.log({serach: search});
        if (!search) {
            return res.status(400).json({ msg: "Search field is required" });
        }

        const users = await userDB.find({ name: { $regex: search, $options: "i" } });
        console.log(users);
        
        const usersData=[];
        users.forEach(element => {
            console.log(element.name);
            data= {
                id: element._id,
                name: element.name,
                role: element.role
            }
            usersData.push(data);
        });

        console.log(usersData);

        if (!users) {
            return res.status(404).json({ msg: "No users found" });
        }


        res.status(200).json({
            msg: "Here are the search results",
            success: true,
            users: usersData
        });
    } catch (error) {
        console.error("Error searching for user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

app.get("/getBloggg", (req, res) => {
    res.send("get blog");
})

app.listen(3000, ()=>{
    console.log("listening to port 3000");
})
