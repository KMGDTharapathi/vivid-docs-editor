
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const DocumentUpload = () => {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: Implement file processing
    toast({
      title: "File uploaded",
      description: "Document upload will be available in the next update",
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-editor-border hover:border-primary/50'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground">
        {isDragActive
          ? "Drop your files here..."
          : "Drag and drop your files here, or click to select"}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        Supports PDF, PPTX, and DOCX
      </p>
    </div>
  );
};

export default DocumentUpload;
