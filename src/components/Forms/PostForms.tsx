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
import { useCreatePost } from "@/lib/react-query/queriesAndMutation"



type PostFormProps = {
  post?: Models.Document;
}

const PostForms = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
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
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
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
              <FormLabel className="shad-form_label">Upload you Photo</FormLabel>
              <FormControl>
                <FileUploader 
                fieldChange={field.onChange}
                mediaURL={post?.imageURL}
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
          <Button type="button" className="shad-button_dark_4">Cancel</Button>
          <Button
            type="submit"
            className="shad-button_primary"
            >
            {isLoadingCreate ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : "Submit"
            }
            </Button>
        </div>
      </form>
    </Form>
  
    
  )
}

export default PostForms