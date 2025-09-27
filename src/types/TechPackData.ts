export interface TechPackData {
  // Basic Information
  brandName: string;
  brandTagline: string;
  batchNumber: string;
  designName: string;
  gender: string;
  category: string[];
  material: string;
  isCustomMaterial?: boolean; // Track if material is custom
  // Material sub-type selection and specs
  materialType?: string; // e.g., "Single Jersey (Combed, Ring-Spun) 160-180 GSM"
  materialTypeImage?: string; // public path to square preview image
  materialTypeSpecs?: string; // additional notes/specs
  brandLogo?: string;

  // Design Details
  frontDesign: string;
  neckTagDesign: string;
  backDesign: string;
  frontMockup: string;
  backMockup: string;

  // Design Images
  frontDesignImage: string;
  neckTagDesignImage: string;
  backDesignImage: string;
  frontMockupImage: string;
  backMockupImage: string;

  // Design Image Comments
  frontDesignImageComment: string;
  neckTagDesignImageComment: string;
  backDesignImageComment: string;
  frontMockupImageComment: string;
  backMockupImageComment: string;

  // Preview inline comments (annotations)
  previewComments: PreviewComment[];

  // Specifications
  trim: string[];
  stitching: string[];
  colors: string[];
  colorGroups: ColorGroup[];
  trimComment: string;
  stitchingComment: string;

  // Size Chart
  fitType: string;
  sizeChart: SizeRow[];
  selectedStandardColumns: string[];
  customColumns: string[];

  // Grading
  grading: GradingRow[];

  // Notes
  notes: string;

  // Comments for each section
  basicInfoComment: string;
  designComment: string;
  specificationsComment: string;
  sizeChartComment: string;
  gradingComment: string;
  notesComment: string;
}

export interface SizeRow {
  size: string;
  chest?: string;
  length?: string;
  sleeve?: string;
  bust?: string;
  waist?: string;
  hip?: string;
  inseam?: string;
  thigh?: string;
  [key: string]: string | undefined;
}

export interface GradingRow {
  measurement: string;
  grade: string;
  direction: string;
}

export interface ColorGroup {
  id: string;
  name: string;
  colors: string[];
}

export interface PreviewComment {
  id: string;
  xPct: number; // left position as percentage of frame width
  yPct: number; // top position as percentage of frame height
  text: string;
}

export interface StepProps {
  data: TechPackData;
  onUpdate: (updates: Partial<TechPackData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}
