import * as z from "zod"

export const SignupValidation = z.object({
    name : z.string().min(2 ,{message : "Too Short!"}),
    username: z.string().min(2,{message : " Too Short!"}).max(50),
    email: z.string().email(),
    password: z.string().min(8, { message : "Too Short,it must at least be 8 characters long"}),
})