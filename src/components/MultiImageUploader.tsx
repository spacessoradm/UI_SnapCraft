import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Cropper from 'react-cropper';
import ImageEditor from './ImageEditor';
import 'cropperjs/dist/cropper.css';

interface MultiImageUploaderProps {
  maxWidth: number;
  maxHeight: number;
  maxImages: number;
  onImagesUpdate: (images: string[]) => void;
}

export default function MultiImageUploader({ maxWidth, maxHeight, maxImages, onImagesUpdate }: MultiImageUploaderProps) {
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [showCropper, setShowCropper] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const cropperRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxImages - croppedImages.filter(Boolean).length;
    const selectedFiles = files.slice(0, remainingSlots).filter(file => file.type.startsWith('image/'));

    const validFiles = selectedFiles.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit
    if (selectedFiles.length !== validFiles.length) {
      alert('Some files are too large. Please upload files smaller than 10MB.');
    }

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    ).then((results) => {
      setOriginalImages((prev) => [...prev, ...results]);
      setCroppedImages((prev) => [...prev, ...Array(results.length).fill('')]);
      // Start cropping the first new image
      setCurrentImageIndex(croppedImages.length);
      setShowCropper(true);
    });

    // Clear the input value so the same file can be selected again
    e.target.value = '';
  };

  const handleCrop = () => {
    if (cropperRef.current && currentImageIndex !== null) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        width: 141,
        height: 141,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      const croppedImageURL = croppedCanvas.toDataURL('image/png', 1.0);
      setCroppedImages((prev) => {
        const newImages = [...prev];
        newImages[currentImageIndex] = croppedImageURL;
        return newImages;
      });

      // Move to next uncropped image if available
      const nextIndex = originalImages.findIndex((_, i) => i > currentImageIndex && !croppedImages[i]);
      if (nextIndex !== -1) {
        setCurrentImageIndex(nextIndex);
      } else {
        setShowCropper(false);
        setCurrentImageIndex(null);
      }

      // Update parent component with new images
      const newImages = [...croppedImages];
      newImages[currentImageIndex] = croppedImageURL;
      onImagesUpdate(newImages.filter(Boolean));
    }
  };

  const handleImageUpdate = (editedImage: string, index: number) => {
    setCroppedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = editedImage;
      onImagesUpdate(newImages.filter(Boolean));
      return newImages;
    });
  };

  const removeImage = (index: number) => {
    setOriginalImages((prev) => prev.filter((_, i) => i !== index));
    setCroppedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      onImagesUpdate(newImages.filter(Boolean));
      return newImages;
    });
  };

  return (
    <div className="space-y-6">
      {croppedImages.filter(Boolean).length < maxImages && !showCropper && (
        <div className="flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors"
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-600">Upload Images</span>
            <span className="mt-1 text-xs text-gray-400">
              {maxImages - croppedImages.filter(Boolean).length} images remaining
            </span>
          </button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      {/* Initial Cropper */}
      {showCropper && currentImageIndex !== null && (
        <div className="space-y-4">
          <Cropper
            ref={cropperRef}
            src={originalImages[currentImageIndex]}
            style={{ height: 400, width: '100%' }}
            aspectRatio={maxWidth / maxHeight}
            guides={true}
            viewMode={1}
            dragMode="move"
            background={false}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Image {currentImageIndex + 1} of {originalImages.length}
            </span>
            <button
              onClick={handleCrop}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Confirm Crop
            </button>
          </div>
        </div>
      )}

      {/* Display cropped images */}
      {croppedImages.filter(Boolean).length > 0 && !showCropper && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {croppedImages.map((image, index) => (
            image && (
              <div key={index} className="relative">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                <ImageEditor
                  image={image}
                  originalImage={originalImages[index]}
                  onUpdate={(editedImage) => handleImageUpdate(editedImage, index)}
                  maxWidth={maxWidth}
                  maxHeight={maxHeight}
                />
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}