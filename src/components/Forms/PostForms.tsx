import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {   Form,   FormControl,   FormField,   FormItem,   FormLabel,   FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../Shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import type { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import {  useToast } from "@/hooks/use-toast"
import Loader from "../Shared/Loader"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutation"



type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update'
}

const PostForms = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  // form defined here 
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues:{
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post.tags.join(','): '',
    },
  })
 
  // 2. Define a submit handler - for - create && update .
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if(post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.$id,
        imageUrl: post?.imageUrl,
      })

      if(!updatedPost){
        toast({ title: 'please try again' });;
      }

      return navigate(`/post/${post.$id}`)
    }



const newPost = await createPost({
  ...values,
  userId: user.id,
});
    if (!newPost) {
  toast({ title: 'Unable to create post, try again' });
  console.error('CreatePost failed', values);
}

    navigate("/");
  }

console.log(post?.imageUrl)

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="felx flex-col gap-9 w-full max-w-5xl "
      >
        {/* Caption */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea 
                className="shad-textarea custom-scrollbar"
                {...field} />
              </FormControl>
              <FormMessage className="shad-form_mess" />
            </FormItem>
          )}
        />
        {/* File Upload */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                {action === 'Create' ? 'Upload your Photo' : 'Update your Photo'}
              </FormLabel>
              <FormControl>
                <FileUploader 
                fieldChange={field.onChange}
                mediaURL={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_mess" />
            </FormItem>
          )}
        />
        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input 
                type="text" 
                className="shad-input"
                placeholder="Add your location"
                {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_mess" />
            </FormItem>
          )}
        />
        {/* Tags */}
        <FormField
          control={form.control}
          name="tags" // <-- changed from "Tags" to "tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label ">Add Tags (separated by comma ",")</FormLabel>
              <FormControl>
                <Input
                type="text"
                className="shad-input"
                placeholder="e.g. nature, beach, sunset, etc."
                {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_mess" />
            </FormItem>
          )}
        />
        {/* Submit button */}
        <div className="flex justify-center gap-4 mt-4">
          <Button 
            type="button" 
            className="shad-button_dark_4"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isLoadingCreate || isLoadingUpdate}
            >
            {isLoadingCreate || isLoadingUpdate ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              `${action} Post`
            )}
            
            </Button>
        </div>
            {/* Spacer for vertical gap */}
            <div className="w-full h-[100px] lg:h-[100px] md:h-[500px] "></div>
      </form>
    </Form>
  
    
  )
}

export default PostForms