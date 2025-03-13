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
    jwt.verify(token, secretkey,(err, decoded)=>{
        if(err){
            console.log("not valid token");
        }else{
            console.log("valid token", decoded);
            req.user=decoded;
            next();
        }
        
    })
}

app.get('/profile', verifyToken, async (req, res)=>{
   
    const user=req.user.email;
    res.send(user);
    const data=await userDB.findOne({email: req.user.email});
    res.json(data);
    res.send(data.username)
})

app.post('/login',async (req, res)=>{
    const {email, password}=req.body;
    const user=await userDB.findOne({email, password});


    if(!user){
        res.status(404).json({
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
        res.status(403).json({
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



app.post("/post",async (req, res)=>{
    const createPayload=req.body;
    const parsePayload=blogCheck.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(403).json({
            msg: "Blog post is missing something"
        });
    }

    await blogsDB.create({
        title: createPayload.title,
        content: createPayload.content,
        name: createPayload.name,
        role: createPayload.role,
        keywords: createPayload.keywords,
        likes: createPayload.likes  
    })

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
console.log("kyaa hua chlra ki nai");