const { generateToken } = require("../middlewares/authMiddleware");
const userDB = require("../models/User");
const loginCheck = require("../type");

exports.loginUser = async (req, res)=>{
    try{
        const {email, password}=req.body;
        const user=await userDB.findOne({email: email});
        console.log("Login User: ",user);

        if(!user){
            return res.status(404).json({
                msg: "User not Found"
            })
        }

        if(user.password !== password){
            return res.status(404).json({
                msg: "Incorrect Password"
            })
        }

        const token=generateToken({email, password});

        res.status(200).json({
            msg: "User exist. You are IN",
            success: true,
            token,
            user
        })
    }catch(error){
        console.log("Server Error: ", error);
        res.status(500).json({
            msg: "Server Error"
        });
    }
};

exports.signupUser = async (req, res)=>{
    try{
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

        const user = await userDB.findOne({email: createPayload.email});
        console.log(user);

        res.status(200).json({
            msg: "Login Successfull",
            token,
            user
        })
    }catch(error){
        console.log("Server error: ", error);
        res.status(500).json({
            msg: "Server Error"
        })
    }
}

exports.userInfo= async (req, res)=>{
    try{    
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
    }catch(error){
        console.log("Server Error", error);
        res.status(500).json({
            msg: "Server Error"
        })
    }
}


exports.autoLogin= (req, res)=>{

    if(!req.user){
        return res.status(404).json({
            msg: "User not found"
        })
    }

    res.status(200).json({
        msg: "You are logged in",
        success: true
    })
}

