const z=require("zod");

const loginCheck=z.object({
    username: z.string().min(3, "Your Username is too short"),
    email: z.string().email().nonempty(),
    password: z.string().min(6, "Your password must be 6 letters long.")
});


const blogCheck=z.object({
    title: z.string().nonempty().min(3, "Title should be atleast 3 character long"),
    content: z.string().nonempty(),
    keyword: z.array(z.string()).min(1, "Atleast 1 keyword is required"),
})

module.exports={
    loginCheck,
    blogCheck
}