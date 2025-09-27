import React, { useState } from 'react';
import { TechPackData } from '../../types/TechPackData';
import BasicInfoStep from './BasicInfoStep';
import DesignStep from './DesignStep';
import SpecificationsStep from './SpecificationsStep';
import SizeChartStep from './SizeChartStep';
import GradingStep from './GradingStep';
import NotesStep from './NotesStep';

interface TechPackGeneratorProps {
  onComplete: (data: TechPackData) => void;
  onBack: () => void;
  initialData?: TechPackData | null;
  onPreview?: (data: TechPackData) => void;
}

const TechPackGenerator: React.FC<TechPackGeneratorProps> = ({
  onComplete,
  onBack,
  initialData,
  onPreview,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [techPackData, setTechPackData] = useState<TechPackData>(
    initialData || {
      brandName: "k'paas",
      brandTagline: "Little's Big Wardrobe",
      batchNumber: '',
      designName: '',
      gender: '',
      category: [],
      material: '',
      isCustomMaterial: false,
      brandLogo: '/default-logo.png',
      frontDesign: '',
      neckTagDesign: '',
      backDesign: '',
      frontMockup: '',
      backMockup: '',
      frontDesignImage: '',
      neckTagDesignImage: '',
      backDesignImage: '',
      frontMockupImage: '',
      backMockupImage: '',
      frontDesignImageComment: '',
      neckTagDesignImageComment: '',
      backDesignImageComment: '',
      frontMockupImageComment: '',
      backMockupImageComment: '',
      previewComments: [],
      trim: [],
      stitching: [],
      colors: [],
      colorGroups: [],
      trimComment: '',
      stitchingComment: '',
      fitType: '',
      sizeChart: [],
      selectedStandardColumns: [],
      customColumns: [],
      grading: [],
      notes: '',
      basicInfoComment: '',
      designComment: '',
      specificationsComment: '',
      sizeChartComment: '',
      gradingComment: '',
      notesComment: '',
    },
  );

  const steps = [
    { title: 'Basic Information', component: BasicInfoStep },
    { title: 'Design Details', component: DesignStep },
    { title: 'Specifications', component: SpecificationsStep },
    { title: 'Size Chart', component: SizeChartStep },
    { title: 'Grading', component: GradingStep },
    { title: 'Notes', component: NotesStep },
  ];

  const handleUpdate = (updates: Partial<TechPackData>) => {
    setTechPackData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(techPackData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F1] to-[#F5F2EC]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#E6E1D9] mobile-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-16">
            <button onClick={onBack} className="flex items-center gap-2 sm:gap-3 group">
              <img
                src="/icon.png"
                alt="FloTechPack Icon"
                className="mobile-header-icon w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg group-hover:opacity-90"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/default-logo.png';
                }}
              />
              <div className="text-left">
                <h1 className="mobile-header-title text-lg sm:text-xl font-bold text-[#0F4C5C] group-hover:underline">
                  <span className="hidden sm:inline">FloTechPack Generator</span>
                  <span className="sm:hidden">Generator</span>
                </h1>
                <p className="mobile-header-subtitle text-xs text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </button>
            <div className="flex items-center gap-2">
              {onPreview && (
                <button
                  onClick={() => onPreview(techPackData)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 sm:px-6 sm:py-2"
                >
                  <span className="hidden sm:inline">Preview</span>
                  <span className="sm:hidden">👁</span>
                </button>
              )}
              
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#E6E1D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{steps[currentStep].title}</span>
            <span className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <CurrentStepComponent
        data={techPackData}
        onUpdate={handleUpdate}
        onNext={handleNext}
        onPrev={handlePrev}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
      />
    </div>
  );
};

export default TechPackGenerator;
