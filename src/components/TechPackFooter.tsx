import React from 'react';

const TechPackFooter: React.FC = () => {
  const colors = ['#EFE9E1', '#CBBFAD', '#D9CBB4'];

  return (
    <footer className="grid grid-cols-2 gap-3 items-start py-3 border-t border-[#E6E1D9]">
      <div>
        <p className="text-[10px] text-gray-700 mb-2 uppercase">Colors</p>
        <div className="flex gap-2">
          {colors.map((c) => (
            <div
              key={c}
              className="w-12 h-12 border rounded flex items-center justify-center text-[10px] font-medium text-gray-800"
              style={{ background: c }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] text-gray-700 mb-2 uppercase">Notes</p>
        <div className="min-h-12 border border-[#E6E1D9] rounded p-2 text-[11px] text-gray-800 bg-[#FBFAF8] italic">
          <ul className="list-disc pl-4 space-y-1">
            <li>1C black print (front)</li>
            <li>3C back print</li>
            <li>Keep artwork 15mm off seams</li>
            <li>Tolerance ±3mm</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default TechPackFooter;
