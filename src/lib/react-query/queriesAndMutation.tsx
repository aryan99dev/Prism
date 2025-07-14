import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,


}from "@tanstack/react-query"
import {createUserAccount, signInAccount, SignOutAccount} from "@/lib/appwrite/api.ts";
import type {INewUser} from "@/types";



//

export const  useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const  useSignInAccount = () => {
    return useMutation({
        mutationFn: (user:{
            email: string;
            password: string;
        }) => signInAccount(user)
    })
}
export const  useSignOutAccount = () => {
    return useMutation({
        mutationFn:  SignOutAccount
    })

}