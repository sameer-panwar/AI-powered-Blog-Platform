const userDB = require("../models/User");
const blogsDB = require("../models/Blog");
const { blogCheck } = require("../type");


exports.postBlog = async (req, res)=>{
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
        username: user.username,
        likes: 0,
        likedBy: []
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
}

    
exports.updateLike = async (req, res)=>{
    const blogID=req.body.blogId;
    const user = req.user._id;

    try{
        
        const blog = await blogsDB.findById(blogID);

        if(!blog){
            console.log("user Not found.");
            return res.status(404).json({msg: "Blog not found"});
        }
        const isLiked = blog?.likedBy?.includes(user);

        let updatedData;

        if (isLiked) {
            updatedData = await blogsDB.findByIdAndUpdate(
                blogID,
                {
                $inc: { likes: -1 },
                $pull: { likedBy: user },
                },
                { new: true }
        );
        console.log("unliked");
        } else {
            updatedData = await blogsDB.findByIdAndUpdate(
                blogID,
                {
                $inc: { likes: 1 },
                $push: { likedBy: user },
                },
                { new: true }
            );
        console.log("Liked");
        }

        res.status(200).json({
            msg: "Blog is Updated!",
            data: updatedData
        })

        
    }catch(err){
        console.log("Error occcured", err);
        res.status(400).json({msg: err})
    } 
}


exports.updateComment = async (req, res)=>{
    const comment = {
        comment: req.body.comment,
        postedBy: req.user._id
    }

    const blogID = req.body.blogID;

    try{
        const updatedData = await blogsDB.findByIdAndUpdate(
            blogID,
            {
                $push: {comments: comment}
            },
            {
                new: true
            }
        )

        if(!updatedData){
            res.status(500).json({
                msg: "Blog not found.",
                status: false
            })
        }
        console.log("commented.");

        res.status(200).json({
            msg: "User commented on the blog.",
            status: true,
            data: updatedData
        });
    }catch(error){
        res.status(500).json({
            msg: "Server error",
            status: false
        })
    }
}

