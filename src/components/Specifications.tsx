import React from 'react';

interface SizeRow {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
}

const Specifications: React.FC = () => {
  const sizeData: SizeRow[] = [
    { size: 'XS', chest: '46 / 18.1', length: '64 / 25.2', sleeve: '19 / 7.5' },
    { size: 'S', chest: '49 / 19.3', length: '67 / 26.4', sleeve: '20 / 7.9' },
    { size: 'M', chest: '52 / 20.5', length: '70 / 27.6', sleeve: '21 / 8.3' },
    { size: 'L', chest: '55 / 21.7', length: '73 / 28.7', sleeve: '22 / 8.7' },
    { size: 'XL', chest: '58 / 22.8', length: '76 / 29.9', sleeve: '23 / 9.1' },
  ];

  return (
    <section className="mb-4">
      <h2 className="text-xs font-semibold mb-2">Specifications</h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-2 border border-[#E6E1D9] rounded bg-[#FDFCFB]">
          <p className="text-[10px] text-gray-600 uppercase">Trim</p>
          <p className="text-xs">Branded neck tape; Woven label</p>
        </div>
        <div className="p-2 border border-[#E6E1D9] rounded bg-[#FDFCFB]">
          <p className="text-[10px] text-gray-600 uppercase">Stitching</p>
          <p className="text-xs">Single needle hem; Coverstitch shoulder</p>
        </div>
      </div>

      {/* SIZE TABLE */}
      <div className="overflow-x-auto mb-3">
        <table className="w-full border border-[#E6E1D9] text-xs bg-[#FDFCFB]">
          <thead className="bg-[#F1EDE6] text-gray-800">
            <tr>
              <th className="border px-2 py-1 text-left">Size</th>
              <th className="border px-2 py-1">Chest</th>
              <th className="border px-2 py-1">Length</th>
              <th className="border px-2 py-1">Sleeve</th>
              <th className="border px-2 py-1">Tolerance</th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row) => (
              <tr key={row.size}>
                <td className="border px-2 py-1">{row.size}</td>
                <td className="border px-2 py-1 text-center">{row.chest}</td>
                <td className="border px-2 py-1 text-center">{row.length}</td>
                <td className="border px-2 py-1 text-center">{row.sleeve}</td>
                <td className="border px-2 py-1 text-center">±1 cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GRADING */}
      <div className="overflow-x-auto">
        <table className="w-full border border-[#E6E1D9] text-xs bg-[#FDFCFB]">
          <thead className="bg-[#F1EDE6] text-gray-800">
            <tr>
              <th className="border px-2 py-1 text-left">Measurement</th>
              <th className="border px-2 py-1">Grade</th>
              <th className="border px-2 py-1">Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Chest</td>
              <td className="border px-2 py-1 text-center">+3 cm</td>
              <td className="border px-2 py-1 text-center">Increase</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Length</td>
              <td className="border px-2 py-1 text-center">+3 cm</td>
              <td className="border px-2 py-1 text-center">Increase</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Sleeve</td>
              <td className="border px-2 py-1 text-center">+1 cm</td>
              <td className="border px-2 py-1 text-center">Increase</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Specifications;
