const userDB = require("../models/User");
const blogsDB = require("../models/Blog");
const { blogCheck } = require("../type");

exports.getBlogsInfo = async (req, res) => {
    try{
        const blogs = await blogsDB.find()
            .select('title info Image')
            .limit(10);
        res.status(200).json({
            msg: "Here are the blogs",
            success: true,
            data: blogs
        });
    }catch(err){
        console.log("Error", err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}

exports.getBlogsById = async (req, res) => {
    const blogId = req.params.id;
    if (!blogId) {
        return res.status(400).json({ msg: "Blog ID is required" });
    }
    try {
        const blog = await blogsDB.findById(blogId)
            .populate("comments.postedBy", '_id name')
            .exec();
        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }
        res.status(200).json({
            msg: "Blog fetched successfully",
            success: true,
            data: blog
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}

exports.getAllBlogs =  async (req, res)=>{
    const blogs=await blogsDB.find().sort({createdAt: -1})
    .populate("comments.postedBy", '_id name')
    .exec();


    if(!blogs){
        return res.status(404).json({msg: "No blogs found"});
    }

    const blogData=[];
    blogs.forEach(element => {
        data=element;
        blogData.push(data);
    });
    
    res.status(200).json({
        msg: "Here are the blogs",
        success: true,
        data: blogData
    })
}

exports.getUserBlogs = async (req, res)=>{
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ msg: "User ID is required" });
    }
    try {
        const user = await userDB.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const blogs = await blogsDB.find({ username: user.username })
            .populate("comments.postedBy", '_id name')
            .exec();

        if (!blogs) {
            return res.status(404).json({ msg: "No blogs found for this user" });
        }

        
        res.status(200).json({
            msg: "User blogs fetched successfully",
            success: true,
            data: blogs
        });
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}

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
        likedBy: [],
        comments: []
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

const notifications =async (blogID, userID, type)=>{
    const blog = await blogsDB.findById(blogID);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    console.log(blog.username);

    const blogOwner = await userDB.findOne({username: blog.username});
    const blogOwnerId = blogOwner._id;

    try{
        if (!blogOwnerId.equals(userID)) {
        await userDB.findByIdAndUpdate(blogOwnerId, {
            $push: {
                notifications: {
                    type: type,
                    blogId: blogID,
                    from: userID
                }
            }
        },
        { new: true } 
    );
    console.log("Notifications is sent.")
    }
    }catch(err){
        console.log("Error", err);
    }
    
    
}    

exports.updateLike = async (req, res)=>{
    const blogID=req.body.blogId;
    const userID = req.user._id;

    try{
        
        const blog = await blogsDB.findById(blogID);

        if(!blog){
            console.log("user Not found.");
            return res.status(404).json({msg: "Blog not found"});
        }
        const isLiked = blog?.likedBy?.includes(userID);

        let updatedData;

        if (isLiked) {
            updatedData = await blogsDB.findByIdAndUpdate(
                blogID,
                {
                $inc: { likes: -1 },
                $pull: { likedBy: userID },
                },
                { new: true }
        );
        console.log("unliked");
        } else {
            updatedData = await blogsDB.findByIdAndUpdate(
                blogID,
                {
                $inc: { likes: 1 },
                $push: { likedBy: userID },
                },
                { new: true }
            );

            await notifications(blogID, userID, "like");
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
        );

        await notifications(blogID, userID, "comment");

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

exports.deletePost = async (req, res)=>{
    const postId = req.params.postId;

    if(!postId){
        return res.status(404).json({
            msg: "Post Id not found."
        })
    }

    const userID = req.user._id;
    await blogsDB.deleteOne({_id: postId});
    await userDB.findByIdAndUpdate(
        {_id: userID},
        { $inc : {blogs: -1}}
    )

    res.status(200).json({
        status: true,
        msg: "Post has been deleted."
    });

}

