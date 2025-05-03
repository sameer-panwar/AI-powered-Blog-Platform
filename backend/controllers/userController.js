const userDB = require("../models/User");
const blogsDB = require("../models/Blog");

exports.profile = async (req, res)=>{

    const adminId = req.params.id;
    const user=await userDB.findById(adminId);

    if(!user){
        return res.status(404).json({msg: "Data not Found"});
    }

    res.status(200).json({msg: "Here is your profile", success: true, user})
}


exports.adminBlogs = async(req, res)=>{
    
    const adminId = req.params.id;
    const user=await userDB.findById(adminId);
    
    const {username} =user;

    const adminBlogs=await blogsDB.find({username})
    .populate("comments.postedBy", '_id name')
    .exec();

    res.status(200).json({
        msg: "Here are the Admin Blogs",
        success: true,
        adminBlogs
    })    
}

exports.editProfile = async (req, res) => {
    try {
        console.log("im in editprofile");
        const {id, name, role, bio } = req.body;
        const username = req.user.username;

        console.log(id, name, role, bio, username);

        if (!name|| !bio || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const updatedUser = await userDB.findByIdAndUpdate(
            id, 
            { name, role, bio },
            { new: true }
        );
        
        console.log("updated User: ", updatedUser);

        const updatedBlogs= await blogsDB.updateMany(
            {username: username},
            {$set: {name: name , role: role}}
        );

        console.log("updated blogs");

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "Profile changes have been saved",
            success: true,
            user: updatedUser,
            blogs: updatedBlogs
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

exports.searchUser = async (req, res) => {
    try {
        const searchUserId =  req.params.id;
        console.log({search: searchUserId});
        if (!searchUserId) {
            return res.status(400).json({ msg: "Search field is required" });
        }

        const users = await userDB.find({ name: { $regex: searchUserId, $options: "i" } });
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
}