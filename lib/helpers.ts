import createJustifiedLayout from 'justified-layout';

import type {
  GridConfig,
  ImageType,
  SectionConfig,
  SectionType,
  SectionsMap,
  SegmentConfig,
  SegmentType,
  SegmentsMap,
  TileType,
} from 'lib/types';

const IMAGE_ASPECT_RATIO: number = 3 / 2;
const COALESCING_FACTOR: number = 7 / 10;

export const estimateSectionHeight = (
  totalImages: number,
  config: GridConfig
): number => {
  const unwrappedWidth =
    IMAGE_ASPECT_RATIO *
    totalImages *
    config.targetRowHeight *
    COALESCING_FACTOR;
  const rows = Math.ceil(unwrappedWidth / config.containerWidth);
  return rows * config.targetRowHeight;
};

export const createSegmentsMap = (
  segments: SegmentType[],
  gridConfig: GridConfig
): SegmentsMap => {
  const map = segments.reduce<SegmentsMap>(
    (map: SegmentsMap, segment: SegmentType) => {
      const segmentLayout = createJustifiedLayout(
        segment.images.map((image: ImageType) => image.metadata),
        gridConfig
      );

      const segmentHeight: number = Math.ceil(segmentLayout.containerHeight);

      return {
        ...map,
        [segment.segmentId]: {
          top: gridConfig.segmentMargin + map['prev'].height,
          height: segmentHeight,
          width: gridConfig.containerWidth,
          tiles: segmentLayout.boxes as TileType[],
        },
        prev: {
          ...map.prev,
          height: segmentHeight + gridConfig.segmentMargin + map['prev'].height,
        },
      } as SegmentsMap;
    },
    { prev: { height: 0, top: 0, width: 0, tiles: [] } }
  );

  delete map['prev'];

  return map;
};

export const recomputeSectionMap = (
  sectionMap: SectionConfig,
  section: SectionType,
  gridConfig: GridConfig
): SectionConfig => {
  const segmentsMap = createSegmentsMap(section.segments, gridConfig);
  const height = sectionFinalHeight(segmentsMap, gridConfig);

  return {
    ...sectionMap,
    segmentsMap,
    height,
  };
};

const sectionFinalHeight = (
  sectionSegmentsMap: SegmentsMap,
  gridConfig: GridConfig
): number => {
  return Object.values(sectionSegmentsMap).reduce<number>(
    (height: number, segmentConfig: SegmentConfig) => {
      return gridConfig.segmentMargin + segmentConfig.height + height;
    },
    0
  );
};

export const updateSectionsTop = (
  sectionsMap: SectionsMap,
  toBeUpdatedSectionsId: string[],
  delta: number
): SectionsMap => {
  return toBeUpdatedSectionsId.reduce<SectionsMap>(
    (map, sectionId: string) => {
      return {
        ...map,
        [sectionId]: { ...map[sectionId], top: map[sectionId].top + delta },
      };
    },
    {
      ...sectionsMap,
    }
  );
};
