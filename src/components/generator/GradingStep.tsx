import React, { useState } from 'react';
import { StepProps, GradingRow } from '../../types/TechPackData';

const GradingStep: React.FC<StepProps> = ({ data, onUpdate, onNext, onPrev, isFirstStep }) => {
  const [newGrading, setNewGrading] = useState<GradingRow>({
    measurement: '',
    grade: '',
    direction: '',
  });

  const addGrading = () => {
    if (newGrading.measurement && newGrading.grade && newGrading.direction) {
      const updatedGrading = [...(data.grading || []), newGrading];
      onUpdate({ grading: updatedGrading });
      setNewGrading({ measurement: '', grade: '', direction: '' });
    }
  };

  const removeGrading = (index: number) => {
    const updatedGrading = data.grading?.filter((_, i) => i !== index) || [];
    onUpdate({ grading: updatedGrading });
  };

  const updateGrading = (index: number, field: keyof GradingRow, value: string) => {
    const updatedGrading = [...(data.grading || [])];
    updatedGrading[index] = { ...updatedGrading[index], [field]: value };
    onUpdate({ grading: updatedGrading });
  };

  const measurementOptions = [
    'Chest',
    'Length',
    'Sleeve',
    'Shoulder',
    'Waist',
    'Hip',
    'Thigh',
    'Knee',
    'Ankle',
  ];

  const directionOptions = ['Increase', 'Decrease', 'No Change'];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Grading Information</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Grading Rule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Measurement</label>
                <select
                  value={newGrading.measurement}
                  onChange={(e) => setNewGrading({ ...newGrading, measurement: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D9D3C9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select measurement</option>
                  {measurementOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <input
                  type="text"
                  value={newGrading.grade}
                  onChange={(e) => setNewGrading({ ...newGrading, grade: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D9D3C9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+3 cm, +1 cm, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                <select
                  value={newGrading.direction}
                  onChange={(e) => setNewGrading({ ...newGrading, direction: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D9D3C9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select direction</option>
                  {directionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={addGrading}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Grading Rule
            </button>
          </div>

          {data.grading && data.grading.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Grading Rules</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-[#E6E1D9] text-sm">
                  <thead className="bg-[#F1EDE6] text-gray-800">
                    <tr>
                      <th className="border px-2 py-1 text-left">Measurement</th>
                      <th className="border px-2 py-1">Grade</th>
                      <th className="border px-2 py-1">Direction</th>
                      <th className="border px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.grading.map((rule, index) => (
                      <tr key={index}>
                        <td className="border px-2 py-1">
                          <select
                            value={rule.measurement}
                            onChange={(e) => updateGrading(index, 'measurement', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            {measurementOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            value={rule.grade}
                            onChange={(e) => updateGrading(index, 'grade', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <select
                            value={rule.direction}
                            onChange={(e) => updateGrading(index, 'direction', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            {directionOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border px-2 py-1">
                          <button
                            onClick={() => removeGrading(index)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Removed grading comments; use final Notes step */}

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
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            title="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradingStep;
