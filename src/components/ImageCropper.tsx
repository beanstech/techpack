import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import aspectRatios from '../constants/aspectRatios';

interface ImageCropperProps {
  image: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
  title: string;
  isMockup?: boolean;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCrop,
  onCancel,
  title,
  isMockup = false,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspectRatio, setAspectRatio] = useState<number>(
    isMockup ? 0.75 : 1
  );
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const aspectRatioOptions = aspectRatios;

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 80,
          },
          aspectRatio,
          width,
          height,
        ),
        width,
        height,
      );
      setCrop(crop);
    },
    [aspectRatio],
  );

  const onDownloadCropClick = useCallback(() => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = completedCrop.width * pixelRatio;
    canvas.height = completedCrop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );

    const croppedImage = canvas.toDataURL('image/png');
    onCrop(croppedImage);
  }, [completedCrop, onCrop]);

  const handleAspectRatioChange = (newAspectRatio: number) => {
    setAspectRatio(newAspectRatio);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 80,
          },
          newAspectRatio,
          width,
          height,
        ),
        width,
        height,
      );
      setCrop(crop);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onDownloadCropClick}
              disabled={!completedCrop}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Crop & Use
            </button>
          </div>
        </div>

        {/* Aspect Ratio Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Aspect Ratio:
          </label>
          <div className="flex flex-wrap gap-2">
            {aspectRatioOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAspectRatioChange(option.value)}
                className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                  aspectRatio === option.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Cropper */}
        <div className="mb-4">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio || undefined}
            className="max-w-full"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={image}
              onLoad={onImageLoad}
              className="max-w-full max-h-64"
            />
          </ReactCrop>
        </div>

        {/* Instructions and Crop Info */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-600">
            {aspectRatio === 0
              ? 'Drag the corners to resize freely'
              : `Aspect ratio locked to ${aspectRatio === 1 ? '1:1' : aspectRatio > 1 ? `${aspectRatio}:1` : `1:${1 / aspectRatio}`} • Drag to reposition`}
          </div>
          <div className="text-gray-500">
            {completedCrop &&
              `Crop size: ${Math.round(completedCrop.width)} × ${Math.round(completedCrop.height)}px`}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageCropper;
