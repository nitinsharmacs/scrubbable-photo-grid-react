export type SectionType = {
  sectionId: string;
  totalImages: number;
  segments: SegmentType[];
};

export type SegmentType = {
  segmentId: string;
  header: string;
  images: ImageType[];
};

export type TileType = {
  width: number;
  height: number;
  top: number;
  left: number;
  aspectRatio?: number;
};

export type ImageType = {
  metadata: {
    width: number;
    height: number;
    orientation?: number;
  };
};

export type SegmentConfig = {
  top: number;
  width: number;
  height: number;
  tiles: TileType[];
};

export type SegmentsMap = {
  [key: string]: SegmentConfig;
};

export type SectionConfig = {
  height: number;
  width?: number;
  top: number;
  visible: boolean;
  index: number;
  segmentsMap: SegmentsMap;
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
