import React from 'react';

const TechPackHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-3 rounded-lg border border-[#E6E1D9] shadow mb-4 bg-[#FBF9F6]">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E6E1D9] text-gray-800 font-bold text-lg">
          K'
        </div>
        <div>
          <h1 className="text-xl font-bold">k'paas</h1>
          <p className="text-xs text-gray-600 italic">The Cotton Tree</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 text-right">
        <div className="p-2 border border-[#E6E1D9] rounded bg-[#F5F2EC]">
          <div className="text-[10px] text-gray-600 uppercase">Batch</div>
          <div className="font-medium text-sm">KP-001</div>
        </div>
        <div className="p-2 border border-[#E6E1D9] rounded bg-[#F5F2EC]">
          <div className="text-[10px] text-gray-600 uppercase">Design</div>
          <div className="font-medium text-sm">Classic Tee</div>
        </div>
        <div className="p-2 border border-[#E6E1D9] rounded bg-[#F5F2EC]">
          <div className="text-[10px] text-gray-600 uppercase">Category</div>
          <div className="font-medium text-sm">T-Shirt</div>
        </div>
        <div className="p-2 border border-[#E6E1D9] rounded bg-[#F5F2EC]">
          <div className="text-[10px] text-gray-600 uppercase">Material</div>
          <div className="font-medium text-sm">Cotton Combed 24s</div>
        </div>
      </div>
    </header>
  );
};

export default TechPackHeader;
