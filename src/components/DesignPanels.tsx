import React from 'react';

const DesignPanels: React.FC = () => {
  const panels = ['Front', 'Neck Tag', 'Back'];

  return (
    <section className="grid grid-cols-3 gap-3 mb-4">
      {panels.map((title) => (
        <div key={title}>
          <div className="text-xs font-semibold px-2 py-1 bg-[#E6E1D9] text-gray-800 rounded-t">
            {title}
          </div>
          <div className="h-36 border border-[#D9D3C9] rounded-b flex items-center justify-center text-gray-500 bg-[#FBFAF8] text-xs">
            {title} Design
          </div>
        </div>
      ))}
    </section>
  );
};

export default DesignPanels;
