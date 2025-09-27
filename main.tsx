import React from 'react';
import DownloadButton from './src/DownloadButton';
import TechPackHeader from './src/components/TechPackHeader';
import DesignPanels from './src/components/DesignPanels';
import Mockups from './src/components/Mockups';
import Specifications from './src/components/Specifications';
import TechPackFooter from './src/components/TechPackFooter';

interface TechPackProps {
  onBack?: () => void;
}

export default function TechPack({ onBack }: TechPackProps): React.JSX.Element {
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-[#E6E1D9]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-3 group">
            <img
              src="/icon.png"
              alt="FloTechPack Icon"
              className="w-12 h-12 object-contain rounded-lg group-hover:opacity-90"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/default-logo.png';
              }}
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-[#0F4C5C] group-hover:underline">FloTechPack</h1>
              <p className="text-xs text-gray-600">Technical Pack Generator</p>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-3" />
      </div>
      <div
        id="main-frame"
        className="main-frame bg-[#F9F6F1] text-gray-900 font-[Poppins] p-4 max-w-4xl mx-auto tracking-wide"
        style={{ aspectRatio: '210/297' }}
      >
        <TechPackHeader />
        <DesignPanels />
        <Mockups />
        <Specifications />
        <TechPackFooter />
      </div>
      <DownloadButton targetElementId="main-frame" batchName="KP-001" designName="Classic-Tee" />
    </>
  );
}
