import React, { useState, useEffect } from 'react';
import { TechPackData } from './types/TechPackData';

interface LandingPageProps {
  onCreateNew: () => void;
  onViewStatic?: () => void;
  onEditDraft?: (draft: { id: string; savedAt: string; data: TechPackData }) => void;
}

interface DraftItem {
  id: string;
  savedAt: string;
  data: TechPackData;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCreateNew, onViewStatic, onEditDraft }) => {
  const [drafts, setDrafts] = useState<DraftItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('techPackDrafts') || '[]');
    setDrafts(stored);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F1] to-[#F5F2EC]">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-[#E6E1D9] mobile-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/icon.png"
                alt="FloTechPack Icon"
                className="mobile-header-icon w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/default-logo.png';
                }}
              />
              <div>
                <h1 className="mobile-header-title text-lg sm:text-xl font-bold text-[#0F4C5C]">FloTechPack</h1>
                <p className="mobile-header-subtitle text-xs text-gray-600 hidden sm:block">Technical Pack Generator</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm text-gray-600">Professional Tech Pack Solutions</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* HERO SECTION */}
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
            Create Professional Technical Packs
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Generate comprehensive technical packs for your clothing designs with detailed
            specifications, size charts, and production guidelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button
              onClick={onCreateNew}
              className="w-full sm:w-auto bg-[#0F4C5C] hover:bg-[#0c3d49] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Create New Tech Pack
            </button>
            {onViewStatic && (
              <button
                onClick={onViewStatic}
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                View Sample
              </button>
            )}
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-20">
          <div className="mobile-card bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-[#E6E1D9]">
            <div className="w-12 h-12 bg-[#e2f1f4] rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#0F4C5C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Layout</h3>
            <p className="text-gray-600 text-sm">
              Industry-standard tech pack format with clear sections for design details,
              specifications, and production notes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E6E1D9]">
            <div className="w-12 h-12 bg-[#e6f2ef] rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#0F4C5C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Size Charts & Grading</h3>
            <p className="text-gray-600 text-sm">
              Comprehensive size charts with detailed measurements and grading information for
              accurate production.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E6E1D9]">
            <div className="w-12 h-12 bg-[#e9eef1] rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#0F4C5C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Export</h3>
            <p className="text-gray-600 text-sm">
              Generate high-quality PDF files ready for sharing with manufacturers and production
              teams.
            </p>
          </div>
        </div>

        {/* IMPORTANCE SECTION */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-10 mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Technical Packs Matter
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">For Designers</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Document design specifications clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Ensure design consistency across production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Reduce communication errors with manufacturers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Maintain quality standards</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">For Manufacturers</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Clear production guidelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Accurate size specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Material and construction details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0F4C5C] mt-1">•</span>
                  <span>Quality control references</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DRAFTS SECTION */}
        {drafts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-8 mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Drafts</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map((draft) => (
                <div key={draft.id} className="border border-[#E6E1D9] rounded-lg p-4 bg-[#FBFAF8]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E6E1D9] text-gray-800 font-bold text-sm">
                        {draft.data.brandName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {draft.data.designName || 'Untitled Design'}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Saved: {formatDate(draft.savedAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onEditDraft?.(draft)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  {/* Mini Preview */}
                  <div className="border border-[#E6E1D9] rounded bg-white p-2">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {['frontDesignImage', 'neckTagDesignImage', 'backDesignImage'].map((key) => {
                        const src = (draft.data as any)[key];
                        return (
                          <div
                            key={key}
                            className="aspect-square bg-[#F5F2EC] border border-[#E6E1D9] rounded flex items-center justify-center overflow-hidden"
                          >
                            {src ? (
                              <img src={src} alt={key} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-[10px] text-gray-400">No Image</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700">
                      <div className="border border-[#E6E1D9] rounded p-1">
                        <div className="text-[9px] text-gray-500 uppercase">Batch</div>
                        <div className="font-medium">{draft.data.batchNumber || '-'}</div>
                      </div>
                      <div className="border border-[#E6E1D9] rounded p-1">
                        <div className="text-[9px] text-gray-500 uppercase">Category</div>
                        <div className="font-medium">{draft.data.category || '-'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA SECTION */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your Tech Pack?</h3>
          <p className="text-gray-600 mb-6">
            Start generating professional technical packs in minutes
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onCreateNew}
              className="bg-[#0F4C5C] hover:bg-[#0c3d49] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E6E1D9] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 FloTechPack. From Lakshya with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
