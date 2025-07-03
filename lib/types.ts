export type SectionType = {
  sectionId: string;
  totalImages: number;
  segments: SegmentType[];
  header: string;
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
  imageurl: string;
  imageId: string;
};

export type TileConfigType = {
  selected: boolean;
};

export type TileMapType = {
  [key: string]: TileConfigType;
};

export type SegmentConfigType = {
  top: number;
  width: number;
  height: number;
  tiles: TileType[];
  headerHeight: number;
  tilesMap: TileMapType;
};

export type SegmentsMapType = {
  [key: string]: SegmentConfigType;
};

export type SectionConfigType = {
  height: number;
  width?: number;
  top: number;
  visible: boolean;
  index: number;
  segmentsMap: SegmentsMapType;
  headerHeight: number;
};

export type SectionsMapType = {
  [key: string]: SectionConfigType;
};

export type GridConfigType = {
  containerWidth: number;
  sectionMargin: number;
  segmentMargin: number;
  targetRowHeight: number;
};
