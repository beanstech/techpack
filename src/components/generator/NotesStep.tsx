import React from 'react';
import { StepProps } from '../../types/TechPackData';

const NotesStep: React.FC<StepProps> = ({ data, onUpdate, onNext, onPrev, isFirstStep }) => {
  const commonNotes = [
    '1C black print (front)',
    '3C back print',
    'Keep artwork 15mm off seams',
    'Tolerance ±3mm',
    'Wash at 30°C',
    'Do not bleach',
    'Iron on low heat',
    'Dry clean only',
    'Handle with care',
    'Quality check required',
  ];

  const addNote = (note: string) => {
    const currentNotes = data.notes || '';
    const newNotes = currentNotes ? `${currentNotes}\n• ${note}` : `• ${note}`;
    onUpdate({ notes: newNotes });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E6E1D9] p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notes & Final Details</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Production Notes</label>
            <textarea
              value={data.notes}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              className="w-full px-3 py-2 border border-[#D9D3C9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="Enter production notes, care instructions, quality requirements, etc..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Add Common Notes
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonNotes.map((note) => (
                <button
                  key={note}
                  onClick={() => addNote(note)}
                  className="px-3 py-2 text-sm border border-[#D9D3C9] rounded-md hover:bg-gray-50 text-left"
                >
                  + {note}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Final Comments</label>
          <textarea
            value={data.notesComment}
            onChange={(e) => onUpdate({ notesComment: e.target.value })}
            className="w-full px-3 py-2 border border-[#D9D3C9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Add any final comments or special instructions..."
          />
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
            className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full hover:bg-green-700"
            title="Generate Tech Pack"
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

export default NotesStep;
