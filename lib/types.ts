export type SectionType = {
  sectionId: string;
  totalImages: number;
  segments: any[];
};

export type SectionConfig = {
  height: number;
  width?: number;
  top: number;
  visible: boolean;
  index?: number;
};

export type SectionsMap = {
  [key: string]: SectionConfig;
};

export type GridConfig = {
  containerWidth: number;
  sectionMargin: number;
  segmentMargin: number;
  targetRowHeight: number;
};
