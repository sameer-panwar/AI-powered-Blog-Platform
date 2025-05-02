const jwt = require("jsonwebtoken");
const userDB = require("../models/User");

const secretkey = process.env.JWT_Secret;

const generateToken = (createPayload)=>{
    const token= jwt.sign({email: createPayload.email, password: createPayload.password}, secretkey);
    console.log(token);
    return token;
}

const verifyToken=async (req, res, next)=>{
    const token=req.headers.authorization;

    if (!token) {
        console.log("invalid token");
        return res.status(401).json({ error: "No token provided" }); 
    }

    jwt.verify(token, secretkey,async (err, decoded)=>{
        if(err){
            console.log("not valid token");
            return res.status(401).json({error: "Invalid token"})
        }

        req.user =await userDB.findOne({email: decoded.email});
        next();

    })
}

module.exports = {
    generateToken,
    verifyToken
}