import { useCallback, useEffect, type JSX, type PropsWithChildren } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { supportedTypes, type FileType } from "../models/fileTypes";
import { toaster } from "./ui/toaster";

const accept: Accept = supportedTypes.reduce((accum: Accept, fileType: FileType) => {
  if (fileType.extensions === undefined || fileType.mimeType === undefined) {
    return accum;
  }
  return {
    ...accum,
    [fileType.mimeType]: [...(accum[fileType.mimeType] ?? []), ...fileType.extensions],
  };
}, {});

interface DropzoneProps {
  onFileDropped: (file: File, content: string) => void;
}

export function Dropzone({ children, onFileDropped }: PropsWithChildren<DropzoneProps>): JSX.Element {
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => {
          console.log("file reading was aborted");
        };
        reader.onerror = () => {
          console.log("file reading has failed");
        };
        reader.onload = () => {
          onFileDropped(file as File, reader.result as string);
        };
        reader.readAsText(file);
      });
    },
    [onFileDropped]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept,
  });

  useEffect(() => {
    if (isDragActive) {
      toaster.dismiss();
      toaster.create({
        description: "Drop the file anywhere to add as a new block",
        type: "info",
        duration: 9000,
        closable: true,
      });
    }
  }, [isDragActive]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
