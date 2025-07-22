import React,{ useCallback, useState } from "react" ;
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "file-selector";
import { Button } from "../ui/button";
import { convertImageUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaURL: string;
}

const FileUploader = ({ fieldChange, mediaURL }: FileUploaderProps) => {
// function
const [file,setFile] = useState<File[]>([]);
const [fileUrl, setFileUrl] = useState( convertImageUrl(mediaURL) );

const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
  setFile(acceptedFiles);
  fieldChange(acceptedFiles);
  setFileUrl(URL.createObjectURL(acceptedFiles[0]));
}, [fieldChange]);

const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  accept: {
    'image/*':['.png','.jpeg','.jpg','.svg']
  }
});


// components
  return (
    <div{...getRootProps()}
    className="flex flex-center flex-col py-4 bg-dark-3/50 border border-[0.5px] border-light-3/20 
    backdrop-blur-[5px] rounded-xl cursor-pointer"
    >
    <input {...getInputProps()} 
    className="cursor-pointer"
    />
    {
      fileUrl ? (
        <>
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10"
        >
        <img 
        src={fileUrl}
        alt="image"
        className="file_uploader-img"
        />
        </div>
        <p className="file_uploader-label"
        >
        Click or drag photo to replace
        </p>
        </>
      ) : (
        <div className="file_uploader-box">
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
      // <p>Drop your files here..</p>:
      // <p>Drag 'n' drop some files here,or click to select files  </p>
      
    }
    </div>
  )
}

export default FileUploader