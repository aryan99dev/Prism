import { zodResolver } from "@hookform/resolvers/zod";
import { Form,  FormControl,  FormDescription,  FormField,  FormItem,  FormLabel,  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import { z } from "zod";
import {SignupValidation} from "@/lib/validation";
import Loader from "@/components/Shared/Loader.tsx";
import {Link , useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import {useCreateUserAccount, useSignInAccount} from "@/lib/react-query/queriesAndMutation.tsx";
import {useUserContext} from "@/context/AuthContext.tsx";



const SignupForm = () => {
    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();

    const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();

    const { mutateAsync: signInAccount, isPending: isSigningIn }  = useSignInAccount();


        // 1. Define your form.
        const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: '',
            username: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof SignupValidation>) {
//create the user
       const newUser = await createUserAccount(values);

       if(!newUser){
           return  toast({
               title: "Sign Up failed. please, try again",
           })
       }
       const session = await signInAccount({
           email: values.email,
           password: values.password,
       });

       if (!session) {
           return toast({
               title: "Sign In failed. please, try again",
           })
       }
       const isLoggedIn = await checkAuthUser();

       if (isLoggedIn) {
           form.reset();

           navigate('/')
       } else {
           return toast({
               title: 'Sign In failed. please, try again'
           })
       }
    }

    return (

// grid
<div className="grid grid-cols-5 grid-rows-5 gap-4 bg-white/5 rounded-3xl
         w-[450px] md:w-[600px] lg:w-[600px]
                h-[60vh] md:h-[60vh] lg:h-[60vh]

ring-[0.7px] ring-violet-300/50 fade-in-shadow backdrop-blur-[5px]
">
    <div className="col-span-5 row-span-5 flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto px-6">
            <Form {...form}>
                <div className="flex flex-col items-center justify-center w-full mb-4">
                    <img 
                        src="/assets/logoTransParent.png" 
                        alt="logo" 
                        className="size-10"
                    />
                    <h1 className="text-xl font-medium text-white">Welcome to
                        <span className="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent"> Prism
                                  </span>
                    </h1>
                    <p className="flex justify-center items-center text-white text-center text-light-1 h-10">
                        Create a account
                    </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mt-1 space-y-3 w-full " >
                    {/*Name*/}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="text-center">
                                <FormLabel className="text-white font-light-1">Enter your name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-center" />
                            </FormItem>
                        )}
                    />
                    {/*UserName*/}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="text-center">
                                <FormLabel className="text-white font-light-1">Enter your username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage className="text-center" />
                            </FormItem>
                        )}
                    />
                    {/*E-Mail*/}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="text-center">
                                <FormLabel className="text-white font-light-1">Enter your E-Mail</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage className="text-center" />
                            </FormItem>
                        )}
                    />
                                {/*Password*/}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="text-center">
                                <FormLabel className="text-white font-light-1">Enter your password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage className="text-center" />
                            </FormItem>
                        )}
                    />
                                {/*Description*/}
                                <FormDescription className="text-center mt-1 text-white/30 " >
                                    Please fill in all the fields to create an account.
                                </FormDescription>
                    <div className="flex justify-center mt-2">
                        <Button
                            className="shad-button_primary"

                            type="submit">
                            {isCreatingUser ? (
                                <div className="flex-center gap-2">
                                   <Loader  />  Loading
                                </div>
                            ) : "Submit"
                            }
                        </Button>

                    </div>
                    {/*    Go to the Login page */}
                        <p className="text-small-regular text-light text-sm text-center mt-4">
                            Already have an account?-
                             <Link to="/sign-in" className="text-violet-400 inline-block mt-1">Log in
                            </Link>
</p>
                </form>
                </div>
            </Form>
        </div>
    </div>
</div>
    )
}


export default SignupForm