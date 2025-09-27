import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadButtonProps {
  targetElementId: string;
  batchName?: string;
  designName?: string;
}

// Sanitize filenames for cross-platform safety
function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9._-]+/g, '-') // replace illegal chars with dashes
    .replace(/-+/g, '-') // collapse consecutive dashes
    .replace(/^-|-$/g, '') // trim leading/trailing dashes
    .slice(0, 120); // keep it reasonably short
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  targetElementId,
  batchName = 'KP-001',
  designName = 'Classic-Tee',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsPDF = async (): Promise<void> => {
    let element: HTMLElement | null = null;
    let originalClasses = '';
    let originalStyles = '';
    
    try {
      setIsDownloading(true);

      element = document.getElementById(targetElementId);
      if (!element) {
        console.error('Target element not found');
        return;
      }

      // Store original classes and styles
      originalClasses = element.className;
      originalStyles = element.getAttribute('style') || '';
      
      // Force web format by removing mobile classes and adding web classes
      element.className = element.className
        .replace(/minimal-preview/g, 'web-preview')
        .replace(/mobile-preview-wrapper/g, 'web-preview-wrapper')
        .replace(/mobile-preview-content/g, 'web-preview-content');
      
      // Add web-specific styles to override mobile CSS
      element.style.cssText = `
        width: 100% !important;
        max-width: 800px !important;
        margin: 0 auto !important;
        transform: none !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
      `;
      
      // Force a re-render by triggering a style recalculation
      element.style.display = 'none';
      element.offsetHeight; // Trigger reflow
      element.style.display = '';
      
      // Wait a bit for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Configure html2canvas options for better quality and A4 optimization
      const canvas = await html2canvas(element, {
        scale: 1.5, // Optimized scale for A4
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#F9F6F1', // Match the background color
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // A4 dimensions in mm - NO MARGINS
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate image dimensions to fill entire page
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Fill entire page with no margins - LIMIT TO FIRST PAGE ONLY
      if (imgHeight <= pdfHeight) {
        // Content fits in one page - fill entire page
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Content exceeds one page - crop to fit first page only
        const scaleFactor = pdfHeight / imgHeight;
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = pdfHeight;

        // Add only the first page, cropped to fit
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, scaledWidth, scaledHeight);
      }

      // Generate filename with batch name and design name (sanitized)
      const filename = sanitizeFileName(`TP-${batchName}-${designName}.pdf`);
      pdf.save(filename);
    } catch (error: unknown) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      // Restore original state
      if (element) {
        element.className = originalClasses;
        element.setAttribute('style', originalStyles);
      }
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={downloadAsPDF}
      disabled={isDownloading}
      className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-2 py-2 sm:px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
      title="Download as PDF"
      aria-label={isDownloading ? 'Generating PDF' : 'Download as PDF'}
    >
      {isDownloading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="hidden sm:inline">Generating...</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="hidden sm:inline">Download PDF</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
