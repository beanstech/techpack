import React, { useState } from 'react';
import { StepProps } from '../../types/TechPackData';
import ImageCropper from '../ImageCropper';

const DesignStep: React.FC<StepProps> = ({ data, onUpdate, onNext, onPrev, isFirstStep }) => {
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [croppingImage, setCroppingImage] = useState<{
    field: string;
    image: string;
    title: string;
  } | null>(null);

  // Check if required images are uploaded
  const isFormValid = () => {
    return (
      data.neckTagDesignImage.trim() !== '' &&
      data.frontMockupImage.trim() !== '' &&
      data.backMockupImage.trim() !== ''
    );
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Get field title for cropper
      const fieldTitles: { [key: string]: string } = {
        frontDesignImage: 'Front Design',
        neckTagDesignImage: 'Neck Tag Design',
        backDesignImage: 'Back Design',
        frontMockupImage: 'Front Mockup',
        backMockupImage: 'Back Mockup',
      };

      setCroppingImage({
        field,
        image: result,
        title: fieldTitles[field] || 'Image',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    if (croppingImage) {
      onUpdate({ [croppingImage.field]: croppedImage });
      setCroppingImage(null);
    }
  };

  const handleCropCancel = () => {
    setCroppingImage(null);
  };

  const handleDragOver = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    setDragOver(field);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(field, file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(field, file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Details</h2>

        <div className="space-y-8">
          {/* Design Images Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Design Images</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Front Design */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Front Design Image
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      dragOver === 'frontDesignImage'
                        ? 'border-blue-500 bg-blue-50'
                        : data.frontDesignImage
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'frontDesignImage')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'frontDesignImage')}
                  >
                    {data.frontDesignImage ? (
                      <div className="space-y-2">
                        <img
                          src={data.frontDesignImage}
                          alt="Front Design"
                          className="w-40 h-40 object-contain rounded border border-gray-200 mx-auto"
                        />
                        <button
                          onClick={() => onUpdate({ frontDesignImage: '' })}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileInput(e, 'frontDesignImage')}
                          className="hidden"
                          id="frontDesignImage"
                        />
                        <label
                          htmlFor="frontDesignImage"
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="h-5"></div>
                </div>

                {/* Front Design Comment removed - use inline preview comments */}
              </div>

              {/* Neck Tag Design */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neck Tag Design Image <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      dragOver === 'neckTagDesignImage'
                        ? 'border-blue-500 bg-blue-50'
                        : data.neckTagDesignImage
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-300 hover:border-red-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'neckTagDesignImage')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'neckTagDesignImage')}
                  >
                    {data.neckTagDesignImage ? (
                      <div className="space-y-2">
                        <img
                          src={data.neckTagDesignImage}
                          alt="Neck Tag Design"
                          className="w-40 h-40 object-contain rounded border border-gray-200 mx-auto"
                        />
                        <button
                          onClick={() => onUpdate({ neckTagDesignImage: '' })}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileInput(e, 'neckTagDesignImage')}
                          className="hidden"
                          id="neckTagDesignImage"
                        />
                        <label
                          htmlFor="neckTagDesignImage"
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="h-5">
                    {data.neckTagDesignImage.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">Neck tag design image is required</p>
                    )}
                  </div>
                </div>

                {/* Neck Tag Comment removed - use inline preview comments */}
              </div>

              {/* Back Design */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Back Design Image
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      dragOver === 'backDesignImage'
                        ? 'border-blue-500 bg-blue-50'
                        : data.backDesignImage
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'backDesignImage')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'backDesignImage')}
                  >
                    {data.backDesignImage ? (
                      <div className="space-y-2">
                        <img
                          src={data.backDesignImage}
                          alt="Back Design"
                          className="w-40 h-40 object-contain rounded border border-gray-200 mx-auto"
                        />
                        <button
                          onClick={() => onUpdate({ backDesignImage: '' })}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileInput(e, 'backDesignImage')}
                          className="hidden"
                          id="backDesignImage"
                        />
                        <label
                          htmlFor="backDesignImage"
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="h-5"></div>
                </div>

                {/* Back Design Comment removed - use inline preview comments */}
              </div>
            </div>
          </div>

          {/* Mockup Images Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Mockup Images</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Front Mockup */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Front Mockup Image <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      dragOver === 'frontMockupImage'
                        ? 'border-blue-500 bg-blue-50'
                        : data.frontMockupImage
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-300 hover:border-red-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'frontMockupImage')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'frontMockupImage')}
                  >
                    {data.frontMockupImage ? (
                      <div className="space-y-2">
                        <img
                          src={data.frontMockupImage}
                          alt="Front Mockup"
                          className="w-full h-56 object-contain rounded"
                        />
                        <button
                          onClick={() => onUpdate({ frontMockupImage: '' })}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileInput(e, 'frontMockupImage')}
                          className="hidden"
                          id="frontMockupImage"
                        />
                        <label
                          htmlFor="frontMockupImage"
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="h-5">
                    {data.frontMockupImage.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">Front mockup image is required</p>
                    )}
                  </div>
                </div>

                {/* Front Mockup Comment removed - use inline preview comments */}
              </div>

              {/* Back Mockup */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Back Mockup Image <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                      dragOver === 'backMockupImage'
                        ? 'border-blue-500 bg-blue-50'
                        : data.backMockupImage
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-300 hover:border-red-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'backMockupImage')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'backMockupImage')}
                  >
                    {data.backMockupImage ? (
                      <div className="space-y-2">
                        <img
                          src={data.backMockupImage}
                          alt="Back Mockup"
                          className="w-full h-56 object-contain rounded"
                        />
                        <button
                          onClick={() => onUpdate({ backMockupImage: '' })}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileInput(e, 'backMockupImage')}
                          className="hidden"
                          id="backMockupImage"
                        />
                        <label
                          htmlFor="backMockupImage"
                          className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="h-5">
                    {data.backMockupImage.trim() === '' && (
                      <p className="text-red-500 text-xs mt-1">Back mockup image is required</p>
                    )}
                  </div>
                </div>

                {/* Back Mockup Comment removed - use inline preview comments */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onPrev}
            disabled={isFirstStep}
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={onNext}
            disabled={!isFormValid()}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
              isFormValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title={isFormValid() ? 'Next' : 'Please upload all required images'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {croppingImage && (
        <ImageCropper
          image={croppingImage.image}
          onCrop={handleCropComplete}
          onCancel={handleCropCancel}
          title={`Crop ${croppingImage.title}`}
          isMockup={croppingImage.field.includes('Mockup')}
        />
      )}
    </div>
  );
};

export default DesignStep;
