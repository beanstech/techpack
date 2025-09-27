import React from 'react';

const Mockups: React.FC = () => {
  const mockups = ['Front Mockup', 'Back Mockup'];

  return (
    <section className="grid grid-cols-2 gap-3 mb-4">
      {mockups.map((mock) => (
        <div key={mock}>
          <div className="text-xs font-semibold mb-1">{mock}</div>
          <div className="h-72 border border-[#D9D3C9] rounded flex items-center justify-center text-gray-500 bg-[#FBFAF8] text-xs">
            {mock} Placeholder
          </div>
        </div>
      ))}
    </section>
  );
};

export default Mockups;
