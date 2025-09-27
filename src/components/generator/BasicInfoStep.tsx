import React, { useRef, useState, useEffect } from 'react';
import { StepProps } from '../../types/TechPackData';
import genders from '../../constants/genders';
import categories from '../../constants/categories';
import materials from '../../constants/materials';
import materialTypes, { MaterialTypeItem } from '../../constants/materialTypes';

const BasicInfoStep: React.FC<StepProps> = ({ data, onUpdate, onNext, onPrev, isFirstStep }) => {
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [showCategoryCheckboxes, setShowCategoryCheckboxes] = useState(false);
  const [showCustomMaterial, setShowCustomMaterial] = useState(data.isCustomMaterial || false);
  const [customMaterial, setCustomMaterial] = useState(data.isCustomMaterial ? data.material : '');
  const categoryRef = useRef<HTMLDivElement>(null);

  // Check if required fields are filled
  const isFormValid = () => {
    const materialValue = showCustomMaterial ? customMaterial : data.material;
    return (
      data.brandName.trim() !== '' &&
      data.brandTagline.trim() !== '' &&
      data.designName.trim() !== '' &&
      data.batchNumber.trim() !== '' &&
      data.gender.trim() !== '' &&
      data.category && data.category.length > 0 &&
      materialValue.trim() !== ''
    );
  };

  const getCategoriesByGender = (gender: string): string[] => {
    const result = categories[gender as keyof typeof categories];
    return Array.isArray(result) ? (result as string[]) : [];
  };

  const getMaterialsByCategories = (categories: string[]): string[] => {
    if (!categories || categories.length === 0) return [];
    
    const allMaterials = new Set<string>();
    categories.forEach(cat => {
      const result = materials[cat as keyof typeof materials];
      if (Array.isArray(result)) {
        result.forEach(mat => allMaterials.add(mat));
      }
    });
    return Array.from(allMaterials);
  };

  const availableCategories = getCategoriesByGender(data.gender);
  const availableMaterials = getMaterialsByCategories(data.category || []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle outside click to close category checkboxes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryCheckboxes(false);
      }
    };

    if (showCategoryCheckboxes) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryCheckboxes]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mobile-card bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Basic Information</h2>

        <div className="mobile-form-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.brandName}
              onChange={(e) => onUpdate({ brandName: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, brandName: true }))}
              className={`mobile-form-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.brandName && data.brandName.trim() === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
              placeholder="Enter brand name"
              required
            />
            {touched.brandName && data.brandName.trim() === '' && (
              <p className="text-red-500 text-xs mt-1">Brand name is required</p>
            )}
          </div>

          {/* Brand Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
            <div
              className={`border ${data.brandLogo ? 'border-[#D9D3C9]' : 'border-dashed border-gray-300'} rounded-md p-3`}
            >
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const result = ev.target?.result as string;
                      onUpdate({ brandLogo: result });
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
                {data.brandLogo && (
                  <div className="flex items-center gap-2">
                    <img
                      src={data.brandLogo || '/default-logo.png'}
                      alt="Brand Logo"
                      className="w-10 h-10 object-contain border border-gray-200 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => onUpdate({ brandLogo: '/default-logo.png' })}
                      className="p-1.5 border border-red-300 text-red-700 rounded hover:bg-red-50"
                      title="Remove logo"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="ml-auto px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
                >
                  Upload Logo
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Tagline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.brandTagline}
              onChange={(e) => onUpdate({ brandTagline: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, brandTagline: true }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.brandTagline && data.brandTagline.trim() === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
              placeholder="Enter brand tagline"
              required
            />
            {touched.brandTagline && data.brandTagline.trim() === '' && (
              <p className="text-red-500 text-xs mt-1">Brand tagline is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.batchNumber}
              onChange={(e) => onUpdate({ batchNumber: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, batchNumber: true }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.batchNumber && data.batchNumber.trim() === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
              placeholder="e.g., KP-001"
              required
            />
            {touched.batchNumber && data.batchNumber.trim() === '' && (
              <p className="text-red-500 text-xs mt-1">Batch number is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Design Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.designName}
              onChange={(e) => onUpdate({ designName: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, designName: true }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.designName && data.designName.trim() === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
              placeholder="e.g., Classic Tee"
              required
            />
            {touched.designName && data.designName.trim() === '' && (
              <p className="text-red-500 text-xs mt-1">Design name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={data.gender}
              onChange={(e) => {
                onUpdate({ 
                  gender: e.target.value, 
                  category: [], 
                  material: '',
                  isCustomMaterial: false 
                });
                setShowCustomMaterial(false);
                setCustomMaterial('');
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.gender && data.gender.trim() === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
            >
              <option value="">Select gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {touched.gender && data.gender.trim() === '' && (
              <p className="text-red-500 text-xs mt-1">Gender is required</p>
            )}
          </div>

          <div ref={categoryRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">(Select up to 2)</span>
            </label>
            
            <div 
              className={`w-full px-3 py-2 border rounded-md cursor-pointer focus:outline-none focus:ring-2 ${
                touched.category && (!data.category || data.category.length === 0)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
              onClick={() => setShowCategoryCheckboxes(!showCategoryCheckboxes)}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  {data.category && data.category.length > 0 
                    ? data.category.join(', ')
                    : 'Click to select categories'
                  }
                </span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${showCategoryCheckboxes ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Checkbox options - shown when clicked */}
            {showCategoryCheckboxes && (
              <div className="mt-2 p-3 border border-gray-300 rounded-md bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((cat) => {
                    const isSelected = data.category?.includes(cat) || false;
                    const isDisabled = !isSelected && data.category && data.category.length >= 2;
                    return (
                      <label key={cat} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            const currentCategories = data.category || [];
                            if (e.target.checked) {
                              if (currentCategories.length < 2) {
                                onUpdate({ 
                                  category: [...currentCategories, cat], 
                                  material: '',
                                  isCustomMaterial: false 
                                });
                                setShowCustomMaterial(false);
                                setCustomMaterial('');
                              }
                            } else {
                              onUpdate({ 
                                category: currentCategories.filter(c => c !== cat), 
                                material: '',
                                isCustomMaterial: false 
                              });
                              setShowCustomMaterial(false);
                              setCustomMaterial('');
                            }
                          }}
                          onBlur={() => setTouched((prev) => ({ ...prev, category: true }))}
                          disabled={isDisabled || !data.gender}
                          className={`mr-2 h-3 w-3 text-blue-600 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          style={{ accentColor: '#2563eb' }}
                        />
                        <span className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                          {cat}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            
            {touched.category && (!data.category || data.category.length === 0) && (
              <p className="text-red-500 text-xs mt-1">At least one category is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material <span className="text-red-500">*</span>
            </label>
            <select
              value={data.material}
              onChange={(e) => {
                if (e.target.value === 'Other') {
                  setShowCustomMaterial(true);
                  onUpdate({
                    material: '',
                    isCustomMaterial: true,
                    materialType: '',
                    materialTypeImage: '',
                    materialTypeSpecs: '',
                  });
                } else {
                  setShowCustomMaterial(false);
                  setCustomMaterial('');
                  onUpdate({
                    material: e.target.value,
                    isCustomMaterial: false,
                    materialType: '',
                    materialTypeImage: '',
                    materialTypeSpecs: '',
                  });
                }
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, material: true }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                touched.material && data.material.trim() === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-[#D9D3C9] focus:ring-blue-500'
              }`}
              disabled={!data.category}
            >
              <option value="">Select material</option>
              {availableMaterials.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
              <option value="Other">Other (Custom)</option>
            </select>
            {touched.material && data.material.trim() === '' && (
              <p className="text-red-500 text-xs mt-1">Material is required</p>
            )}
          </div>

          {/* Custom Material Input */}
          {showCustomMaterial && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Material <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customMaterial}
                onChange={(e) => {
                  setCustomMaterial(e.target.value);
                  onUpdate({ 
                    material: e.target.value,
                    isCustomMaterial: true 
                  });
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, material: true }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  touched.material && customMaterial.trim() === ''
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-[#D9D3C9] focus:ring-blue-500'
                }`}
                placeholder="Enter custom material name"
                required
              />
              {touched.material && customMaterial.trim() === '' && (
                <p className="text-red-500 text-xs mt-1">Custom material is required</p>
              )}
            </div>
          )}
          {/* Material Type Palette */}
          {data.material && materialTypes[data.material] && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select {data.material} Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {materialTypes[data.material].map((item: MaterialTypeItem) => {
                  const selected = data.materialType === item.key;
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() =>
                        onUpdate({
                          materialType: item.key,
                          materialTypeSpecs: `${item.name} • ${item.attributes.join(', ')} • ${item.gsmRange}`,
                        })
                      }
                      className={`text-left border rounded-lg bg-white hover:shadow-sm transition-shadow p-3 ${selected ? 'ring-2 ring-blue-600 border-blue-300' : 'border-[#E6E1D9]'}`}
                    >
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="mt-0.5 text-xs text-gray-600">
                        {item.attributes.join(', ')}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-700 font-semibold">
                        {item.gsmRange}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Comments removed from Basic Information to keep flow clean */}

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
            disabled={!isFormValid()}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
              isFormValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title={isFormValid() ? 'Next' : 'Please fill in all required fields'}
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

export default BasicInfoStep;
