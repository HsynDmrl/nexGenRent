import { useState, useEffect } from 'react';

interface UseFileHandlerReturn {
  files: File[];
  previewUrls: string[];
  addFiles: (newFiles: FileList) => void;
  removeFile: (index: number) => void;
}

export const useFileHandler = (initialFiles: File[] = []): UseFileHandlerReturn => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const newFileUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newFileUrls);

    return () => newFileUrls.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const addFiles = (newFiles: FileList) => {
    setFiles(prev => [...prev, ...Array.from(newFiles)]);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return { files, previewUrls, addFiles, removeFile };
};
