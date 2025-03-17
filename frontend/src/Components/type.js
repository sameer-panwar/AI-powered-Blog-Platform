import {z} from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().nonempty("email must not be empty").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  
  export const loginSchema = z.object({
    email: z.string().nonempty("email must not be empty").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });


export const blogCheck=z.object({
    title: z.string().min(3, "Title should be atleast 3 character long"),
    content: z.string(),
    keywords: z.array(z.string()).min(1, "Atleast 1 keyword is required"),
    name: z.string(),
    role: z.string(),
    likes: z.number()
})

export const nameCheck=z.object({name: z.string().nonempty("Name must not be empty")})
export const roleCheck=z.object({role: z.string().nonempty("Role must not be empty")})
