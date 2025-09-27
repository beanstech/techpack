import React, { useState } from 'react';
import { StepProps, ColorGroup } from '../../types/TechPackData';
import trim from '../../constants/trim';
import stitching from '../../constants/stitching';
import colorPresets from '../../constants/colorPresets';

const SpecificationsStep: React.FC<StepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
  isFirstStep,
}) => {
  const [newColor, setNewColor] = useState('#000000');
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColorsForGroup, setSelectedColorsForGroup] = useState<string[]>([]);
  const getTrimOptionsByCategories = (categories: string[]) => {
    if (!categories || categories.length === 0) return [];
    
    const allTrimOptions = new Set<string>();
    categories.forEach(cat => {
      const result = trim[cat as keyof typeof trim];
      if (Array.isArray(result)) {
        result.forEach(option => allTrimOptions.add(option));
      }
    });
    return Array.from(allTrimOptions);
  };

  const getStitchingOptionsByCategories = (categories: string[]) => {
    if (!categories || categories.length === 0) return [];
    
    const allStitchingOptions = new Set<string>();
    categories.forEach(cat => {
      const result = stitching[cat as keyof typeof stitching];
      if (Array.isArray(result)) {
        result.forEach(option => allStitchingOptions.add(option));
      }
    });
    return Array.from(allStitchingOptions);
  };

  const trimOptions = getTrimOptionsByCategories(data.category || []);
  const stitchingOptions = getStitchingOptionsByCategories(data.category || []);

  const colorOptions = colorPresets;

  const handleColorToggle = (color: string) => {
    const currentColors = data.colors || [];
    if (currentColors.includes(color)) {
      onUpdate({ colors: currentColors.filter((c) => c !== color) });
    } else {
      onUpdate({ colors: [...currentColors, color] });
    }
  };

  const handleColorPickerChange = (color: string) => {
    setNewColor(color);
  };

  const handleHexInputChange = (hex: string) => {
    setNewColor(hex);
  };

  const handleAddColor = () => {
    let colorToAdd = newColor;

    // Ensure hex starts with # and is valid
    if (!colorToAdd.startsWith('#')) {
      colorToAdd = '#' + colorToAdd;
    }

    // Validate hex format
    if (/^#[0-9A-Fa-f]{6}$/.test(colorToAdd)) {
      const currentColors = data.colors || [];
      if (!currentColors.includes(colorToAdd)) {
        onUpdate({ colors: [...currentColors, colorToAdd] });
      }
    }
  };

  const handleRemoveColor = (colorToRemove: string) => {
    const currentColors = data.colors || [];
    onUpdate({ colors: currentColors.filter((c) => c !== colorToRemove) });
  };

  const handleCreateColorGroup = () => {
    if (newGroupName.trim() && selectedColorsForGroup.length > 0) {
      const newGroup: ColorGroup = {
        id: Date.now().toString(),
        name: newGroupName.trim(),
        colors: [...selectedColorsForGroup],
      };
      
      const currentGroups = data.colorGroups || [];
      onUpdate({ colorGroups: [...currentGroups, newGroup] });
      
      // Clear form
      setNewGroupName('');
      setSelectedColorsForGroup([]);
    }
  };

  const handleDeleteColorGroup = (groupId: string) => {
    const currentGroups = data.colorGroups || [];
    onUpdate({ colorGroups: currentGroups.filter((g) => g.id !== groupId) });
  };

  const handleToggleColorForGroup = (color: string) => {
    if (selectedColorsForGroup.includes(color)) {
      setSelectedColorsForGroup(selectedColorsForGroup.filter((c) => c !== color));
    } else if (selectedColorsForGroup.length < 3) {
      setSelectedColorsForGroup([...selectedColorsForGroup, color]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trim Details Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trim Details</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {trimOptions.length > 0 ? (
                trimOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.trim?.includes(option) || false}
                      onChange={(e) => {
                        const currentTrim = data.trim || [];
                        if (e.target.checked) {
                          onUpdate({ trim: [...currentTrim, option] });
                        } else {
                          onUpdate({ trim: currentTrim.filter((item) => item !== option) });
                        }
                      }}
                      className="mr-3 h-4 w-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ accentColor: '#2563eb' }}
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">
                  Please select a category in Basic Information to see trim options
                </div>
              )}
            </div>
          </div>

          {/* Stitching Details Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stitching Details
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {stitchingOptions.length > 0 ? (
                stitchingOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.stitching?.includes(option) || false}
                      onChange={(e) => {
                        const currentStitching = data.stitching || [];
                        if (e.target.checked) {
                          onUpdate({ stitching: [...currentStitching, option] });
                        } else {
                          onUpdate({
                            stitching: currentStitching.filter((item) => item !== option),
                          });
                        }
                      }}
                      className="mr-3 h-4 w-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ accentColor: '#2563eb' }}
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">
                  Please select a category in Basic Information to see stitching options
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments removed: handled in Preview inline annotations */}

        {/* Colors Section - Full Width */}
        <div className="mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>

            {/* Add Color Section */}
            <div className="mb-4 p-4 border border-[#D9D3C9] rounded-lg bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Add Color:</label>
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => handleColorPickerChange(e.target.value)}
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    title="Color Picker"
                  />
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => handleHexInputChange(e.target.value)}
                    placeholder="#000000"
                    className="px-2 py-1 border border-gray-300 rounded text-sm w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddColor}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Add Color"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Select a color or enter hex code, then click "Add Color"
                </div>
              </div>
            </div>

            {/* Selected Colors Display */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Selected Colors ({data.colors?.length || 0})
              </h4>
              {data.colors && data.colors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <span className="text-sm font-mono text-gray-700">{color}</span>
                      <button
                        onClick={() => handleRemoveColor(color)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Remove color"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No colors selected yet</p>
              )}
            </div>

            {/* Quick Color Presets */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Presets</h4>
              <div className="grid grid-cols-8 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`w-12 h-12 rounded border-2 ${
                      data.colors?.includes(color)
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Color Grouping Section */}
        <div className="mt-8">
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-medium text-gray-800 mb-4">Color Grouping</h4>
            
            {/* Create New Group */}
            <div className="mb-6 p-4 border border-[#D9D3C9] rounded-lg bg-gray-50">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Create Color Group</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g., Earth Tones, Pastels, Primary Colors"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Colors for Group ({selectedColorsForGroup.length} selected)
                  </label>
                  {data.colors && data.colors.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.colors.map((color, index) => {
                        const isSelected = selectedColorsForGroup.includes(color);
                        const isDisabled = !isSelected && selectedColorsForGroup.length >= 3;
                        return (
                          <button
                            key={index}
                            onClick={() => handleToggleColorForGroup(color)}
                            disabled={isDisabled}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : isDisabled
                                ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                                : 'border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                          >
                            <div
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm font-mono">{color}</span>
                            {isSelected && (
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No colors available. Add colors first.</p>
                  )}
                  
                  {selectedColorsForGroup.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-2">Selected for this group:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedColorsForGroup.map((color, index) => (
                          <div key={index} className="flex items-center gap-2 px-2 py-1 bg-white border border-blue-300 rounded">
                            <div
                              className="w-3 h-3 rounded border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs font-mono text-gray-700">{color}</span>
                            <button
                              onClick={() => handleToggleColorForGroup(color)}
                              className="text-blue-600 hover:text-blue-800 text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleCreateColorGroup}
                  disabled={!newGroupName.trim() || selectedColorsForGroup.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Group
                </button>
              </div>
            </div>

            {/* Existing Color Groups */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-3">
                Color Groups ({data.colorGroups?.length || 0})
              </h5>
              {data.colorGroups && data.colorGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.colorGroups.map((group) => (
                    <div key={group.id} className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{group.name}</h5>
                        <button
                          onClick={() => handleDeleteColorGroup(group.id)}
                          className="text-red-500 hover:text-red-700 text-sm p-1 hover:bg-red-50 rounded"
                          title="Delete group"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {group.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border border-gray-200"
                          >
                            <div
                              className="w-3 h-3 rounded border border-gray-300 shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs font-mono text-gray-700">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  <p className="text-sm text-gray-500">No color groups created yet</p>
                  <p className="text-xs text-gray-400 mt-1">Create your first color palette above</p>
                </div>
              )}
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

export default SpecificationsStep;
