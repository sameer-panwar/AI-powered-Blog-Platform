const z=require("zod");

const loginCheck=z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
});


const blogCheck=z.object({
    title: z.string().min(3, "Title should be atleast 3 character long"),
    content: z.string(),
    keywords: z.array(z.string()).min(1, "Atleast 1 keyword is required"),
    name: z.string(),
    role: z.string(),
    likes: z.number()
})

module.exports={
    loginCheck,
    blogCheck
}