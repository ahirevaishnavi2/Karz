import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { RiUploadCloudLine } from "react-icons/ri";

interface UploadBankStatementProps {
  onCalculateScore: () => void;
}

const UploadBankStatement: React.FC<UploadBankStatementProps> = ({
  onCalculateScore,
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);

      const username = "Sanjay"; // Hardcoded username here
      if (!username) throw new Error("User not logged in");

      formData.append("userName", username);
      // Using fetch directly for FormData
      const res = await fetch("http://localhost:9191/scores/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || res.statusText);
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Upload Successful",
        description:
          "Your bank statement has been uploaded and is being analyzed.",
      });
      onCalculateScore();
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed ${
          isDragging ? "border-primary-500 bg-primary-50" : "border-gray-300"
        } rounded-lg p-6 text-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <RiUploadCloudLine className="text-4xl text-gray-400 mb-2 mx-auto" />
        <p className="text-sm text-gray-600 mb-2">
          {file
            ? `Selected file: ${file.name}`
            : "Drag and drop your statement file here, or"}
        </p>
        <div>
          <label
            htmlFor="fileUpload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
          >
            {file ? "Change File" : "Browse Files"}
          </label>
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            accept=".pdf,.csv,.xlsx"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Supported formats: PDF, CSV, XLSX (up to 10MB)
        </p>
      </div>

      <div>
        <Button
          className="w-full"
          onClick={handleUpload}
          disabled={!file || uploadMutation.isLoading}
        >
          {uploadMutation.isLoading ? "Uploading..." : "Upload and Analyze"}
        </Button>
      </div>
    </div>
  );
};

export default UploadBankStatement;
