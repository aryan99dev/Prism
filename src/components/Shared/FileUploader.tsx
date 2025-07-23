import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "file-selector";
import { Button } from "../ui/button";
import { convertImageUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaURL: string;
}

const FileUploader = ({ fieldChange, mediaURL }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(convertImageUrl(mediaURL));

  useEffect(() => {
    // If a new file is selected, show its preview. Otherwise, show mediaURL.
    if (file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);
      setFileUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setFileUrl(convertImageUrl(mediaURL));
    }
  }, [file, mediaURL]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
  }, [fieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  });

  return (
    <div {...getRootProps()}
      className="flex flex-center flex-col py-4 bg-dark-3/50 border border-[0.5px] border-light-3/20 \
    backdrop-blur-[5px] rounded-xl cursor-pointer"
    >
      <input {...getInputProps()}
        className="cursor-pointer"
      />
      {
        fileUrl ? (
          <>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
              <img
                src={fileUrl}
                alt="image"
                className="file_uploader-img"
              />
            </div>
            <p className="file_uploader-label">
              Click or drag photo to replace
            </p>
          </>
        ) : (
          <div className="file_uploader-box w-64 h-64">
            <img
              src="/Icons/file-upload.svg"
              width={96}
              height={77}
              alt="file-upload"
            />
            <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
            <p className="text-white/35 small-regular mb-6" > SVG, PNG ,JPG</p>
            <Button className="shad-button_dark_5">
              Select From your computer
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader