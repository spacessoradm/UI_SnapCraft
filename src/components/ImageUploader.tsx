import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageUploaderProps {
  maxWidth: number;
  maxHeight: number;
  isPuzzle?: boolean;
  onImageUpdate: (image: string) => void;
}

export default function ImageUploader({ maxWidth, maxHeight, isPuzzle, onImageUpdate }: ImageUploaderProps) {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        width: maxWidth,
        height: maxHeight,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      const croppedImageURL = croppedCanvas.toDataURL('image/jpeg', 1.0);
      onImageUpdate(croppedImageURL);
      setShowCropper(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-600">Upload Image</span>
          <span className="mt-1 text-xs text-gray-400">Supports: JPG, PNG (Max 10MB)</span>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {showCropper && (
        <div className="relative">
          <Cropper
            ref={cropperRef}
            src={originalImage}
            style={{ height: 400, width: '100%' }}
            aspectRatio={maxWidth / maxHeight}
            guides={true}
            viewMode={1}
            dragMode="move"
            scalable={false}
            zoomable={true}
            cropBoxResizable={false}
            cropBoxMovable={true}
            background={false}
          />
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleCrop}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Confirm Crop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}