import { useState } from "react";
import { useCreateStory } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import FileUploader from "../FileUploader";
import Loader from "../Loader";
import { useToast } from "@/hooks/use-toast";

interface CreateStoryModalProps {
  onClose: () => void;
}

const CreateStoryModal = ({ onClose }: CreateStoryModalProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const { user } = useUserContext();
  const { mutateAsync: createStory, isPending } = useCreateStory();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (file.length === 0) {
      toast({
        title: "Please select an image for your story",
        variant: "destructive",
      });
      return;
    }

    try {
      await createStory({
        userId: user.id,
        file: file,
        caption: caption.trim() || undefined,
      });

      toast({
        title: "Story created successfully!",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create story",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ">
      <div className="bg-dark-2/0   rounded-3xl p-6 w-full max-w-md mx-4 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Create Story</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FileUploader
            fieldChange={setFile}
            mediaURL=""
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Caption (optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption to your story..."
              className="w-full p-3 bg-dark-3 border border-dark-4 rounded-2xl text-white placeholder-gray-400 resize-none"
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-gray-400 mt-1">
              {caption.length}/200 characters
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="shad-button_dark_4"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 shad-button_primary"
              disabled={isPending || file.length === 0}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader />
                  Creating...
                </div>
              ) : (
                "Share Story"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryModal;