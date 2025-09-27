import React, { useState } from 'react';
import { StepProps, SizeRow } from '../../types/TechPackData';
import fitTypes from '../../constants/fitTypes';

const SizeChartStep: React.FC<StepProps> = ({ data, onUpdate, onNext, onPrev, isFirstStep }) => {
  // Standard measurement columns that can be added
  const availableColumns = [
    'Chest', 'Bust', 'Waist', 'Hip', 'Length', 'Sleeve', 'Inseam', 'Thigh', 
    'Shoulder', 'Armhole', 'Neck', 'Cuff', 'Hem', 'Rise', 'Knee', 'Ankle'
  ];

  // State for managing selected and custom columns
  const [selectedStandardColumns, setSelectedStandardColumns] = useState<string[]>(data.selectedStandardColumns || []);
  const [customColumns, setCustomColumns] = useState<string[]>(data.customColumns || []);
  const [newColumnName, setNewColumnName] = useState('');
  const [showAddColumn, setShowAddColumn] = useState(false);

  // Get all selected columns (selected standard + custom)
  const allColumns = [...selectedStandardColumns, ...customColumns];

  // Handle selecting/deselecting standard columns
  const handleToggleStandardColumn = (columnName: string) => {
    const isSelected = selectedStandardColumns.includes(columnName);
    let updatedSelectedColumns;
    
    if (isSelected) {
      updatedSelectedColumns = selectedStandardColumns.filter(col => col !== columnName);
    } else {
      updatedSelectedColumns = [...selectedStandardColumns, columnName];
    }
    
    setSelectedStandardColumns(updatedSelectedColumns);
    onUpdate({ selectedStandardColumns: updatedSelectedColumns });
  };

  // Handle adding custom column
  const handleAddCustomColumn = () => {
    if (newColumnName.trim() && !allColumns.includes(newColumnName.trim())) {
      const updatedCustomColumns = [...customColumns, newColumnName.trim()];
      setCustomColumns(updatedCustomColumns);
      onUpdate({ customColumns: updatedCustomColumns });
      setNewColumnName('');
      setShowAddColumn(false);
    }
  };

  // Handle removing custom column
  const handleRemoveCustomColumn = (columnName: string) => {
    const updatedCustomColumns = customColumns.filter(col => col !== columnName);
    setCustomColumns(updatedCustomColumns);
    onUpdate({ customColumns: updatedCustomColumns });
  };

  const updateSize = (index: number, field: keyof SizeRow, value: string) => {
    const updatedSizes = [...(data.sizeChart || [])];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    onUpdate({ sizeChart: updatedSizes });
  };

  const removeSize = (index: number) => {
    const updatedSizes = data.sizeChart?.filter((_, i) => i !== index) || [];
    onUpdate({ sizeChart: updatedSizes });
  };

  const addCustomSize = () => {
    const newSize: SizeRow = {
      size: '',
    };
    // Initialize all available columns as empty
    allColumns.forEach(column => {
      (newSize as any)[column.toLowerCase()] = '';
    });
    const updatedSizes = [...(data.sizeChart || []), newSize];
    onUpdate({ sizeChart: updatedSizes });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Size Chart</h2>

        {/* Fit Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Fit Type</label>
          <select
            value={data.fitType}
            onChange={(e) => onUpdate({ fitType: e.target.value })}
            className="w-full px-3 py-2 border border-[#D9D3C9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select fit type</option>
            {fitTypes.map((fit) => (
              <option key={fit} value={fit}>
                {fit}
              </option>
            ))}
          </select>
        </div>

        {/* Column Management */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Measurement Columns</h3>
          
          {/* Standard Columns */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Standard Columns (Click to select)</h4>
            <div className="flex flex-wrap gap-2">
              {availableColumns.map((column) => {
                const isSelected = selectedStandardColumns.includes(column);
                return (
                  <button
                    key={column}
                    onClick={() => handleToggleStandardColumn(column)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                    }`}
                  >
                    {column}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Columns */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Custom Columns</h4>
              <button
                onClick={() => setShowAddColumn(!showAddColumn)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                + Add Custom Column
              </button>
            </div>
            
            {showAddColumn && (
              <div className="mb-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter column name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleAddCustomColumn}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddColumn(false);
                      setNewColumnName('');
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {customColumns.map((column) => (
                <span
                  key={column}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200 flex items-center gap-2"
                >
                  {column}
                  <button
                    onClick={() => handleRemoveCustomColumn(column)}
                    className="text-green-600 hover:text-green-800 text-xs"
                    title="Remove column"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Size Chart Table */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Size Measurements</h3>
              <button
                onClick={addCustomSize}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              + Add Size Row
              </button>
            </div>

            {data.sizeChart && data.sizeChart.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-[#E6E1D9] text-sm">
                  <thead className="bg-[#F1EDE6] text-gray-800">
                    <tr>
                      <th className="border px-3 py-2 text-left">Size</th>
                    {allColumns.map((field) => (
                        <th key={field} className="border px-3 py-2 text-center">
                          {field}
                        </th>
                      ))}
                      <th className="border px-3 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.sizeChart.map((sizeRow, index) => (
                      <tr key={index}>
                        <td className="border px-3 py-2">
                          <input
                            type="text"
                            value={sizeRow.size}
                            onChange={(e) => updateSize(index, 'size', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Size"
                          />
                        </td>
                      {allColumns.map((field) => (
                          <td key={field} className="border px-3 py-2">
                            <input
                              type="text"
                              value={sizeRow[field.toLowerCase() as keyof SizeRow] || ''}
                              onChange={(e) =>
                                updateSize(
                                  index,
                                  field.toLowerCase() as keyof SizeRow,
                                  e.target.value,
                                )
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder={`${field} (cm)`}
                            />
                          </td>
                        ))}
                        <td className="border px-3 py-2 text-center">
                          <button
                            onClick={() => removeSize(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                            title="Remove size"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
              <p>No sizes added yet. Click "Add Size Row" to get started.</p>
              </div>
            )}
          </div>

        {/* Removed size chart comments; use final Notes step */}

        {/* Navigation Buttons */}
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

export default SizeChartStep;
