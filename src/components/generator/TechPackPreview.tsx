import React, { useEffect, useState } from 'react';
import { TechPackData, PreviewComment } from '../../types/TechPackData';
import DownloadButton from '../../DownloadButton';

interface TechPackPreviewProps {
  data: TechPackData;
  onBack: () => void;
  onEdit: () => void;
  onSaveDraft: (data: TechPackData) => void;
  message?: string;
  messageType?: 'success' | 'error';
}

const TechPackPreview: React.FC<TechPackPreviewProps> = ({
  data,
  onBack,
  onEdit,
  onSaveDraft,
  message,
  messageType = 'success',
}) => {
  const [isMinimal, setIsMinimal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // Inline comments on preview canvas
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState<Array<{
    id: string;
    xPct: number;
    yPct: number;
    text: string;
    isEditing: boolean;
  }>>([]);
  // Removed dynamic sizing usage; keeping minimal/colorful fixed sizes

  // Load initial comments from data
  useEffect(() => {
    if (data.previewComments && data.previewComments.length > 0) {
      setComments(
        data.previewComments.map((c) => ({ ...c, isEditing: false }))
      );
    }
  }, [data.previewComments]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        const target = event.target as Element;
        if (!target.closest('.mobile-menu-container')) {
          setShowMobileMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  const handleMainFrameClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingComment) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const newComment = { id: Date.now().toString(), xPct, yPct, text: '', isEditing: true };
    setComments((prev) => [...prev, newComment]);
    setIsAddingComment(false);
  };

  const handleEditComment = (id: string, text: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  const handleStartEditComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, isEditing: true } : c)));
  };

  const handleFinishEditComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, isEditing: false } : c)));
  };

  const handleRemoveComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleImageLoad = (_imageKey: string, _naturalWidth: number, _naturalHeight: number) => {};

  // Header and outer wrapper remain colorful regardless of minimal toggle
  const outerWrapperClass = 'min-h-screen bg-gradient-to-br from-[#F9F6F1] to-[#F5F2EC]';
  const topHeaderClass = 'bg-white shadow-sm border-b border-[#E6E1D9]';
  const saveBtnClass =
    'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200';
  const editBtnClass =
    'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200';
  // removed Back to Home button; use clickable title/icon instead
  const toastClass =
    messageType === 'error'
      ? 'fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm px-4 py-2 rounded shadow'
      : 'fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded shadow';

  // Preview content switches based on minimal toggle (sizes same as colorful; only spacing changes)
  const mainFrameClass = isMinimal
    ? 'main-frame relative bg-white text-black font-[Poppins] px-6 sm:px-12 py-4 sm:py-8 max-w-4xl mx-auto tracking-wide'
    : 'main-frame relative bg-[#F9F6F1] text-gray-900 font-[Poppins] p-2 sm:p-4 max-w-4xl mx-auto tracking-wide border-2 border-gray-300';

  const mainFrameStyle = { 
    aspectRatio: '210/297' as const
  };

  const headerContainerClass = isMinimal
    ? 'flex items-start justify-between mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-gray-300'
    : 'flex items-start justify-between p-2 sm:p-4 rounded-lg border border-[#E6E1D9] mb-2 sm:mb-4 bg-[#FBF9F6]';

  const brandLogoClass = isMinimal
    ? 'w-8 sm:w-12 h-8 sm:h-12 object-contain'
    : 'w-8 sm:w-12 h-8 sm:h-12 object-contain border border-[#E6E1D9] rounded bg-white';

  const infoCardClass = isMinimal ? '' : 'p-1 sm:p-2 border border-[#E6E1D9] rounded bg-white';
  const infoGridClass = isMinimal
    ? 'grid grid-cols-3 gap-1 sm:gap-3 text-[10px] sm:text-xs'
    : 'grid grid-cols-3 gap-1 sm:gap-2 text-[10px] sm:text-xs';
  const materialContainerClass = isMinimal
    ? 'col-span-3 mt-1'
    : 'col-span-3 p-1 sm:p-2 border border-[#E6E1D9] rounded bg-white';

  // Section spacings: only reduce inter-section margins in minimal mode

  const panelTitleClass = isMinimal
    ? 'absolute top-1 -left-6 sm:-left-10 text-black text-[6px] sm:text-[10px] font-semibold z-20 bg-white px-0.5 sm:px-1 py-0.5 rounded border border-gray-200 shadow-sm'
    : 'text-[10px] sm:text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 bg-[#E6E1D9] text-gray-800 rounded-t w-full';
  const mockupTitleClass = isMinimal
    ? 'absolute top-1 -left-6 sm:-left-10 text-black text-[6px] sm:text-[10px] font-semibold z-20 bg-white px-0.5 sm:px-1 py-0.5 rounded border border-gray-200 shadow-sm'
    : 'text-[10px] sm:text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 bg-[#E6E1D9] text-gray-800 rounded-t w-full';

  // Image containers: keep colorful sizes even in minimal; minimal only removes backgrounds/borders
  const getPanelBoxClass = (imageKey: string) => {
    const baseMinimal = 'overflow-visible relative border border-gray-200 rounded';
    const baseColorful = 'border border-[#D9D3C9] rounded-b bg-[#FBFAF8] overflow-hidden relative';
    
    // Smart sizing based on image type - all design images are square, responsive size
    if (imageKey.includes('Neck Tag')) {
      // Neck tag: square container
      return (isMinimal ? baseMinimal : baseColorful) + ' h-24 w-24 sm:h-40 sm:w-40';
    } else if (imageKey.includes('Front') || imageKey.includes('Back')) {
      // Design panels: square container
      return (isMinimal ? baseMinimal : baseColorful) + ' h-24 w-24 sm:h-40 sm:w-40';
    }
    
    // Default fallback - square
    return (isMinimal ? baseMinimal : baseColorful) + ' h-24 w-24 sm:h-40 sm:w-40';
  };
  
  const getMockupContainerClass = (_imageKey: string) => {
    const baseMinimal = 'overflow-visible relative border border-gray-200 rounded';
    const baseColorful = 'border border-[#D9D3C9] rounded-b bg-[#FBFAF8] overflow-hidden relative';
    
    // Smart sizing for mockups - wider landscape format, responsive size
    return (isMinimal ? baseMinimal : baseColorful) + ' h-48 w-36 sm:h-80 sm:w-60';
  };

  const mockupImgClass = isMinimal
    ? 'w-full h-full object-contain'
    : 'w-full h-full object-contain';
  const placeholderTextClass = isMinimal ? 'text-gray-400' : 'text-gray-500';

  const specSectionClass = isMinimal ? 'mb-2 sm:mb-4' : 'mb-2 sm:mb-4';
  const specTitleClass = isMinimal
    ? 'text-[10px] sm:text-sm font-semibold text-black mb-1 sm:mb-3'
    : 'text-[10px] sm:text-xs font-semibold mb-1 sm:mb-2';
  const specCardClass = isMinimal ? '' : 'p-1 sm:p-2 border border-[#E6E1D9] rounded bg-[#FDFCFB]';

  const sizeTableClass = isMinimal
    ? 'w-full text-[10px]'
    : 'w-full border border-[#E6E1D9] text-[10px] sm:text-xs bg-[#FDFCFB]';
  const sizeTheadClass = isMinimal ? 'text-black' : 'bg-[#F1EDE6] text-gray-800';
  const sizeThClass = isMinimal
    ? 'border-b border-gray-300 px-1 sm:px-2 py-1 sm:py-2 text-left font-semibold text-[10px]'
    : 'border px-1 sm:px-2 py-0.5 sm:py-1 text-left text-[10px] sm:text-xs';

  const footerClass = isMinimal
    ? 'grid grid-cols-2 gap-1 sm:gap-3 items-start pt-2 sm:pt-4 border-t border-gray-300'
    : 'grid grid-cols-2 gap-1 sm:gap-3 items-start py-1 sm:py-3 border-t border-[#E6E1D9]';
  const colorBoxClass = isMinimal
    ? 'w-10 sm:w-16 h-5 sm:h-8 flex items-center justify-center text-[6px] sm:text-[10px] font-medium text-black'
    : 'w-10 sm:w-16 h-5 sm:h-8 border rounded flex items-center justify-center text-[6px] sm:text-[10px] font-medium text-gray-800';
  const notesBoxClass = isMinimal
    ? 'min-h-6 sm:min-h-12 p-1 sm:p-2 text-[8px] sm:text-[11px] text-black'
    : 'min-h-6 sm:min-h-12 border border-[#E6E1D9] rounded p-1 sm:p-2 text-[8px] sm:text-[11px] text-gray-800 bg-[#FBFAF8] italic';

  return (
    <div className={outerWrapperClass}>
      {/* Header (always colorful) */}
      <div className={`${topHeaderClass} mobile-header`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-16">
            <button onClick={onBack} className="flex items-center gap-2 sm:gap-3 group">
              <img
                src="/icon.png"
                alt="FloTechPack Icon"
                className="mobile-header-icon w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg group-hover:opacity-90"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/default-logo.png';
                }}
              />
              <div className="text-left">
                <h1 className="mobile-header-title text-lg sm:text-xl font-bold text-[#0F4C5C] group-hover:underline">
                  <span className="hidden sm:inline">FloTechPack Preview</span>
                  <span className="sm:hidden">Preview</span>
                </h1>
                <p className="mobile-header-subtitle text-xs text-gray-600 hidden sm:block">Review your technical pack</p>
              </div>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Minimal Switch - Always visible */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimal((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    !isMinimal ? 'bg-gray-300' : 'bg-[#0F4C5C]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      !isMinimal ? 'translate-x-1' : 'translate-x-6'
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${!isMinimal ? 'text-[#0F4C5C]' : 'text-gray-500'}`}
                >
                  <span className="hidden sm:inline">Minimal</span>
                </span>
              </div>

              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsAddingComment(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  title="Add a comment anywhere on the page"
                >
                  Add Comment
                </button>
                <button
                  onClick={() => {
                    const toPersist: PreviewComment[] = comments.map(({ id, xPct, yPct, text }) => ({
                      id,
                      xPct,
                      yPct,
                      text,
                    }));
                    onSaveDraft({ ...data, previewComments: toPersist });
                  }}
                  className={saveBtnClass}
                >
                  Save Draft
                </button>
                <button onClick={onEdit} className={editBtnClass}>
                  Edit
                </button>
              </div>

              {/* Mobile Three-Dot Menu */}
              <div className="sm:hidden relative mobile-menu-container">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="More actions"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                
                {/* Mobile Menu Dropdown */}
                {showMobileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsAddingComment(true);
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span>💬</span>
                        Add Comment
                      </button>
                      <button
                        onClick={() => {
                          const toPersist: PreviewComment[] = comments.map(({ id, xPct, yPct, text }) => ({
                            id,
                            xPct,
                            yPct,
                            text,
                          }));
                          onSaveDraft({ ...data, previewComments: toPersist });
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span>💾</span>
                        Save Draft
                      </button>
                      <button
                        onClick={() => {
                          onEdit();
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span>✏️</span>
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {message && <div className={toastClass}>{message}</div>}

      {/* Tech Pack Content (toggles minimal) */}
      <div
        id="main-frame"
        className={`${mainFrameClass} ${isAddingComment ? 'cursor-crosshair' : 'cursor-default'} mobile-preview-container`}
        style={mainFrameStyle}
        onClick={handleMainFrameClick}
      >
        {/* HEADER */}
        <header className={headerContainerClass}>
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-4">
            <img
              src={data.brandLogo || '/default-logo.png'}
              alt="Brand Logo"
              className={brandLogoClass}
            />
            <div className="text-left">
              <h1 className={`text-lg sm:text-xl font-bold ${isMinimal ? 'text-black' : 'text-gray-900'}`}>
                {data.brandName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 italic">{data.brandTagline}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className={infoGridClass}>
            <div className={infoCardClass}>
              <div className="text-[10px] sm:text-[9px] text-gray-500 uppercase tracking-wide font-medium">Batch & Design</div>
              <div
                className={`font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1 ${isMinimal ? 'text-black' : 'text-gray-800'}`}
              >
                {data.batchNumber} • {data.designName}
              </div>
            </div>
            <div className={infoCardClass}>
              <div className="text-[10px] sm:text-[9px] text-gray-500 uppercase tracking-wide font-medium">Gender</div>
              <div
                className={`font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1 ${isMinimal ? 'text-black' : 'text-gray-800'}`}
              >
                {data.gender}
              </div>
            </div>
            <div className={infoCardClass}>
              <div className="text-[10px] sm:text-[9px] text-gray-500 uppercase tracking-wide font-medium">Category</div>
              <div
                className={`font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1 ${isMinimal ? 'text-black' : 'text-gray-800'}`}
              >
                {data.category ? data.category.join(', ') : ''}
              </div>
            </div>
            <div className={materialContainerClass}>
              <div className="text-[10px] sm:text-[9px] text-gray-500 uppercase tracking-wide font-medium">Material</div>
              <div
                className={`font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1 ${isMinimal ? 'text-black' : 'text-gray-800'}`}
              >
                {data.material}
              </div>
              {data.materialTypeSpecs && (
                <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] text-gray-600">{data.materialTypeSpecs}</div>
              )}
            </div>
          </div>
        </header>

        {/* MOCKUPS */}
        <section className={isMinimal ? 'flex justify-around mb-1' : 'flex justify-around mb-4'}>
          {[
            {
              title: 'Front Mockup',
              mockup: data.frontMockup,
              image: data.frontMockupImage,
              comment: data.frontMockupImageComment,
            },
            {
              title: 'Back Mockup',
              mockup: data.backMockup,
              image: data.backMockupImage,
              comment: data.backMockupImageComment,
            },
          ].map((mock) => (
            <div key={mock.title} className="flex flex-col items-center">
              {!isMinimal && <div className={mockupTitleClass}>{mock.title}</div>}
              <div className={getMockupContainerClass(`mockup-${mock.title}`)}>
                {mock.image ? (
                  <div className="relative h-full flex items-center justify-center">
                    <img 
                      src={mock.image} 
                      alt={`${mock.title}`} 
                      className={mockupImgClass}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        handleImageLoad(`mockup-${mock.title}`, img.naturalWidth, img.naturalHeight);
                      }}
                    />
                    {isMinimal && <div className={panelTitleClass}>{mock.title}</div>}
                    {mock.comment && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 text-white text-[10px] p-1 ${isMinimal ? 'bg-black' : 'bg-black bg-opacity-75'}`}
                      >
                        {mock.comment}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`h-full flex items-center justify-center text-xs ${placeholderTextClass}`}
                  >
                    {mock.mockup || `${mock.title} Placeholder`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* DESIGN PANELS */}
        <section className={isMinimal ? 'flex justify-around mb-1' : 'flex justify-around mb-4'}>
          {[
            {
              title: 'Front',
              design: data.frontDesign,
              image: data.frontDesignImage,
              comment: data.frontDesignImageComment,
            },
            {
              title: 'Neck Tag',
              design: data.neckTagDesign,
              image: data.neckTagDesignImage,
              comment: data.neckTagDesignImageComment,
            },
            {
              title: 'Back',
              design: data.backDesign,
              image: data.backDesignImage,
              comment: data.backDesignImageComment,
            },
          ].map((panel) => {
            const hasImage = panel.image && panel.image.trim() !== '';
            const isNeckTag = panel.title === 'Neck Tag';

            if (isNeckTag) {
              return (
                <div key={panel.title} className="flex flex-col items-center">
                  {!isMinimal && <div className={panelTitleClass}>{panel.title}</div>}
                  <div className={getPanelBoxClass(`panel-${panel.title}`)}>
                    {hasImage ? (
                      <div className="relative h-full flex items-center justify-center">
                        <img
                          src={panel.image}
                          alt={`${panel.title} Design`}
                          className="w-full h-full object-contain"
                          onLoad={(e) => {
                            const img = e.currentTarget;
                            handleImageLoad(`panel-${panel.title}`, img.naturalWidth, img.naturalHeight);
                          }}
                        />
                        {isMinimal && <div className={panelTitleClass}>{panel.title}</div>}
                        {panel.comment && (
                          <div
                            className={`absolute bottom-0 left-0 right-0 text-white text-[10px] p-1 ${isMinimal ? 'bg-black' : 'bg-black bg-opacity-75'}`}
                          >
                            {panel.comment}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`h-full flex items-center justify-center text-xs ${placeholderTextClass}`}
                      >
                        {panel.design || `${panel.title} Design`}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (hasImage) {
              return (
                <div key={panel.title} className="flex flex-col items-center">
                  {!isMinimal && <div className={panelTitleClass}>{panel.title}</div>}
                  <div className={getPanelBoxClass(`panel-${panel.title}`)}>
                    <div className="relative h-full flex items-center justify-center">
                      <img
                        src={panel.image}
                        alt={`${panel.title} Design`}
                        className="w-full h-full object-cover"
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          handleImageLoad(`panel-${panel.title}`, img.naturalWidth, img.naturalHeight);
                        }}
                      />
                      {isMinimal && <div className={panelTitleClass}>{panel.title}</div>}
                      {panel.comment && (
                        <div
                          className={`absolute bottom-0 left-0 right-0 text-white text-[10px] p-1 ${isMinimal ? 'bg-black' : 'bg-black bg-opacity-75'}`}
                        >
                          {panel.comment}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </section>

        {/* SPECIFICATIONS */}
        <section className={specSectionClass}>
          <h2 className={specTitleClass}>Specifications</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={specCardClass}>
              <p className="text-[10px] text-gray-600 uppercase font-semibold mb-1">Trim Details</p>
              <p className="text-xs leading-relaxed">
                {data.trim.length > 0 ? data.trim.join('; ') : 'Not specified'}
              </p>
            </div>
            <div className={specCardClass}>
              <p className="text-[10px] text-gray-600 uppercase font-semibold mb-1">Stitching Details</p>
              <p className="text-xs leading-relaxed">
                {data.stitching.length > 0 ? data.stitching.join('; ') : 'Not specified'}
              </p>
            </div>
          </div>

          {/* SIZE TABLE */}
          {data.sizeChart && data.sizeChart.length > 0 && (
            <div className="overflow-x-auto mb-4">
              <table className={sizeTableClass}>
                <thead className={sizeTheadClass}>
                  <tr>
                    <th className={sizeThClass}>Size</th>
                    {[...(data.selectedStandardColumns || []), ...(data.customColumns || [])].map((column) => (
                      <th
                        key={column}
                        className={
                          isMinimal
                            ? 'border-b border-gray-300 px-2 py-2 font-semibold'
                            : 'border px-2 py-1'
                        }
                      >
                        {column}
                      </th>
                    ))}
                    <th
                      className={
                        isMinimal
                          ? 'border-b border-gray-300 px-2 py-2 font-semibold'
                          : 'border px-2 py-1'
                      }
                    >
                      Tolerance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.sizeChart.map((row, index) => (
                    <tr key={index} className={isMinimal ? 'border-b border-gray-200' : ''}>
                      <td
                        className={
                          isMinimal ? 'px-2 py-2 text-black font-medium' : 'border px-2 py-1'
                        }
                      >
                        {row.size}
                      </td>
                      {[...(data.selectedStandardColumns || []), ...(data.customColumns || [])].map((column) => (
                        <td
                          key={column}
                          className={
                            isMinimal
                              ? 'px-2 py-2 text-center text-black'
                              : 'border px-2 py-1 text-center'
                          }
                        >
                          {row[column.toLowerCase() as keyof typeof row] || ''}
                        </td>
                      ))}
                      <td
                        className={
                          isMinimal
                            ? 'px-2 py-2 text-center text-gray-600'
                            : 'border px-2 py-1 text-center'
                        }
                      >
                        ±1 cm
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* GRADING */}
          {data.grading && data.grading.length > 0 && (
            <div className="overflow-x-auto">
              <table className={sizeTableClass}>
                <thead className={sizeTheadClass}>
                  <tr>
                    <th className={sizeThClass}>Measurement</th>
                    <th
                      className={
                        isMinimal
                          ? 'border-b border-gray-300 px-2 py-2 font-semibold'
                          : 'border px-2 py-1'
                      }
                    >
                      Grade
                    </th>
                    <th
                      className={
                        isMinimal
                          ? 'border-b border-gray-300 px-2 py-2 font-semibold'
                          : 'border px-2 py-1'
                      }
                    >
                      Direction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.grading.map((rule, index) => (
                    <tr key={index} className={isMinimal ? 'border-b border-gray-200' : ''}>
                      <td
                        className={
                          isMinimal ? 'px-2 py-2 text-black font-medium' : 'border px-2 py-1'
                        }
                      >
                        {rule.measurement}
                      </td>
                      <td
                        className={
                          isMinimal
                            ? 'px-2 py-2 text-center text-black'
                            : 'border px-2 py-1 text-center'
                        }
                      >
                        {rule.grade}
                      </td>
                      <td
                        className={
                          isMinimal
                            ? 'px-2 py-2 text-center text-black'
                            : 'border px-2 py-1 text-center'
                        }
                      >
                        {rule.direction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* COLORS & NOTES */}
        <footer className={footerClass}>
          <div>
            <p
              className={`text-[10px] mb-2 uppercase ${isMinimal ? 'text-gray-600 tracking-wide' : 'text-gray-700'}`}
            >
              Colors
            </p>
            <div className="space-y-2">
              {/* Show color groups if present, otherwise show individual colors */}
              {data.colorGroups && data.colorGroups.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {data.colorGroups.map((group) => (
                    <div key={group.id} className="inline-block border border-gray-300 rounded p-2 bg-gray-50">
                      <p className="text-[10px] font-semibold text-gray-700 mb-1">{group.name}</p>
                      <div className="flex gap-1 flex-wrap">
                        {group.colors.map((color, index) => (
                          <div key={index} className={colorBoxClass} style={{ backgroundColor: color }}>
                            {color}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : data.colors && data.colors.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {data.colors.map((color, index) => (
                    <div key={index} className={colorBoxClass} style={{ backgroundColor: color }}>
                      {color}
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-xs ${isMinimal ? 'text-gray-400' : 'text-gray-500'}`}>
                  No colors selected
                </p>
              )}
            </div>
          </div>
          <div>
            <p
              className={`text-[10px] mb-2 uppercase ${isMinimal ? 'text-gray-600 tracking-wide' : 'text-gray-700'}`}
            >
              Notes
            </p>
            <div className={notesBoxClass}>
              {data.notes ? (
                <div className="whitespace-pre-line">{data.notes}</div>
              ) : (
                <p className={isMinimal ? 'text-gray-400' : 'text-gray-500'}>No notes provided</p>
              )}
            </div>
          </div>
          {data.notesComment && (
            <div className="col-span-2 mt-3 flex items-start gap-2 text-[11px] text-gray-800">
              <svg className="w-3.5 h-3.5 mt-0.5 text-gray-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2H5v-.92l8.06-8.06.92.92L5.92 19.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              <div className="whitespace-pre-line">{data.notesComment}</div>
            </div>
          )}
        </footer>
        {/* Inline Comments Layer */}
        {comments.map((c) => (
          <div
            key={c.id}
            className="absolute group"
            style={{
              left: `${c.xPct}%`,
              top: `${c.yPct}%`,
              transform: c.isEditing ? 'translate(-50%, -50%)' : 'translate(0, -50%)',
            }}
          >
            <div className="relative">
              {c.isEditing ? (
                <textarea
                  value={c.text}
                  onChange={(e) => handleEditComment(c.id, e.target.value)}
                  onBlur={() => handleFinishEditComment(c.id)}
                  placeholder="Add comment..."
                  className="min-w-[220px] max-w-[320px] min-h-[48px] text-[11px] leading-snug px-2 py-1 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  autoFocus
                />
              ) : (
                <div className="inline-block max-w-[280px] bg-white/30 text-[11px] leading-snug px-1.5 py-0.5 rounded">
                  <span className="whitespace-pre-wrap break-words text-black">{c.text || ''}</span>
                  {/* Hover actions */}
                  <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEditComment(c.id)}
                      className="mr-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] leading-5 text-center shadow"
                      title="Edit comment"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleRemoveComment(c.id)}
                      className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] leading-5 text-center shadow"
                      title="Delete comment"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <DownloadButton
        targetElementId="main-frame"
        batchName={data.batchNumber}
        designName={data.designName}
      />
    </div>
  );
};

export default TechPackPreview;
