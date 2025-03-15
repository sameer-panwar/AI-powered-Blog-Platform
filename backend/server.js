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

app.get('/status', (req, res)=>{
   
    res.send("connected");
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
        token,user
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



app.post("/postBlog", verifyToken ,async (req, res)=>{
    const createPayload={
        ...req.body,
        keyword: Array.isArray(req.body.keywords) ? req.body.keywords : []};
    console.log(req.body);
    const parsePayload=blogCheck.safeParse(createPayload);

    const user=await userDB.findOne({email: req.user.email});
    if(!user){
        return res.status(404).json({msg: "User not found"});
    }

    console.log("in backend");
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
    console.log("posted successfully");
    res.status(200).json({
        msg: "Blog has been posted"
    })
})


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


app.listen(3000, ()=>{
    console.log("listening to port 3000");
})
