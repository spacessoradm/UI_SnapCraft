import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCw, Crop, Sliders, X, Save } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageEditorProps {
  image: string;
  originalImage: string;
  onUpdate: (editedImage: string) => void;
  maxWidth: number;
  maxHeight: number;
  isPuzzle?: boolean;
}

interface ImageAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
}

const defaultAdjustments: ImageAdjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
};

export default function ImageEditor({
  image,
  originalImage,
  onUpdate,
  maxWidth,
  maxHeight,
  isPuzzle,
}: ImageEditorProps) {
  const [rotation, setRotation] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [adjustments, setAdjustments] = useState<ImageAdjustments>(defaultAdjustments);
  const [currentImage, setCurrentImage] = useState(image);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef<any>(null);

  const applyEdits = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Adjust canvas dimensions for rotation
      if (rotation % 180 === 0) {
        canvas.width = img.width;
        canvas.height = img.height;
      } else {
        canvas.width = img.height;
        canvas.height = img.width;
      }

      if (ctx) {
        // Apply adjustments via canvas filter
        ctx.filter = `
          brightness(${adjustments.brightness}%)
          contrast(${adjustments.contrast}%)
          saturate(${adjustments.saturation}%)
          blur(${adjustments.blur}px)
          sepia(${adjustments.sepia}%)
        `;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const newImage = canvas.toDataURL('image/png', 1.0);
        setCurrentImage(newImage);
      }
    };

    img.src = image;
  }, [image, adjustments, rotation]);

  useEffect(() => {
    applyEdits();
  }, [image, adjustments, rotation, applyEdits]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleAdjustmentChange = (key: keyof ImageAdjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      const croppedImage = croppedCanvas.toDataURL('image/png', 1.0);
      setCurrentImage(croppedImage);
      setShowCropper(false);
    }
  };

  const resetAdjustments = () => {
    setAdjustments(defaultAdjustments);
  };

  const handleSave = () => {
    onUpdate(currentImage);
    setShowEditor(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
        <img src={currentImage} alt="Preview" className="w-full h-auto object-contain" />
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
          {maxWidth}mm x {maxHeight}mm
        </div>
        {isPuzzle && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white border-opacity-50" />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowEditor(true)}
          className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
          title="Edit"
        >
          <Sliders className="h-5 w-5" />
          <span>Edit Image</span>
        </button>
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Image Editor</h3>
              <button
                onClick={() => setShowEditor(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {!showCropper ? (
                <>
                  <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={currentImage}
                      alt="Edit Preview"
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleRotate}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
                    >
                      <RotateCw className="h-5 w-5" />
                      <span>Rotate</span>
                    </button>
                    <button
                      onClick={() => setShowCropper(true)}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Crop className="h-5 w-5" />
                      <span>Re-crop</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {Object.keys(defaultAdjustments).map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={adjustments[key as keyof ImageAdjustments]}
                          onChange={(e) =>
                            handleAdjustmentChange(
                              key as keyof ImageAdjustments,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    ))}

                    <button
                      onClick={resetAdjustments}
                      className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Reset Adjustments
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <Cropper
                    ref={cropperRef}
                    src={currentImage}
                    style={{ height: 400, width: '100%' }}
                    aspectRatio={1}
                    guides={false}
                  />
                  <div className="flex justify-center mt-4 gap-4">
                    <button
                      onClick={handleCrop}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      Crop Image
                    </button>
                    <button
                      onClick={() => setShowCropper(false)}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 flex justify-end gap-4">
              <button
                onClick={resetAdjustments}
                className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Reset All
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
