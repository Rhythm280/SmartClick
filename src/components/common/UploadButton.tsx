import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

type UploadButtonProps = {
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  className?: string;
  label?: string;
  variant?: 'primary' | 'secondary';
  icon?: boolean;
};

const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  multiple = false,
  accept = 'image/*',
  className = '',
  label = 'Upload',
  variant = 'primary',
  icon = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onUpload(fileArray);
      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
      
      if (imageFiles.length > 0) {
        onUpload(multiple ? imageFiles : [imageFiles[0]]);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const buttonClass = variant === 'primary' 
    ? 'btn-primary' 
    : 'btn-secondary';

  return (
    <div 
      className={`relative ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`btn ${buttonClass} btn-md ${isDragging ? 'ring-2 ring-primary-400' : ''}`}
        onClick={handleClick}
      >
        {icon && <Upload className="mr-2 h-4 w-4" />}
        {label}
      </motion.button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
    </div>
  );
};

export default UploadButton;