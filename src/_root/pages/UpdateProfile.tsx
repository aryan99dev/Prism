import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Shared/Loader";
import FileUploader from "@/components/Shared/FileUploader";
import DotBackground from "@/components/Shared/DotBackground";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutation";
import { ProfileValidation } from "@/lib/validation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

const UpdateProfile = () => {
  // Hooks and state
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const queryClient = useQueryClient();
  // Set up form with validation and default values
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  // Fetch current user data by ID
  const { data: currentUser } = useGetUserById(id || "");
  // Mutation for updating user
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

  // Show loader if user data is not loaded
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // Handler for updating user profile
  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
      return;
    }

    // Update user context with new data
    setUser({
      ...user,
      name: updatedUser.name,
      bio: updatedUser.bio,
      imageUrl: updatedUser.imageUrl,
    });

    // Refresh user data in cache
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
    });

    // Navigate back to profile
    return navigate(`/profile/${id}`);
  };

  // Render
  return (
    <div className="flex flex-col min-h-screen relative w-full">
      {/* Dot background */}
      <div className="fixed inset-0 w-full h-full">
        <DotBackground />
      </div>
      {/* Content layer */}
      <div className="relative z-10 w-full md:ml-[150px] flex-1">
        <div className="common-container">
          <div className="flex-start gap-3 justify-start w-full max-w-5xl">
            <img
              src="/Icons/edit-05.svg"
              width={36}
              height={36}
              alt="edit"
              className="invert-white"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
          </div>
          {/* Profile update form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
              {/* File uploader */}
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <FileUploader
                        fieldChange={field.onChange}
                        mediaURL={currentUser.imageUrl}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Username field (disabled) */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="shad-input"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email field (disabled) */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="shad-input"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Bio field */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="shad-textarea custom-scrollbar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              {/* Action buttons */}
              <div className="flex gap-4 items-center justify-end">
                <Button
                  type="button"
                  className="shad-button_dark_4"
                  onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                  disabled={isLoadingUpdate}>
                  {isLoadingUpdate && <Loader />}
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* Spacer at the bottom for layout */}
      <div className="w-full" style={{ height: "200px" }} />
    </div>
  );
};

export default UpdateProfile;
