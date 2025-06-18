import createJustifiedLayout from 'justified-layout';

import type {
  GridConfig,
  ImageType,
  SectionType,
  SectionsMap,
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

      return {
        ...map,
        [segment.segmentId]: {
          top: gridConfig.segmentMargin + map['prev'].height,
          height: segmentLayout.containerHeight,
          width: gridConfig.containerWidth,
          tiles: segmentLayout.boxes as TileType[],
        },
        prev: {
          ...map.prev,
          height:
            segmentLayout.containerHeight +
            gridConfig.segmentMargin +
            map['prev'].height,
        },
      } as SegmentsMap;
    },
    { prev: { height: 0, top: 0, width: 0, tiles: [] } }
  );

  delete map['prev'];

  return map;
};

export const initSectionsMap = (
  sections: SectionType[],
  gridConfig: GridConfig
) => {
  const map = sections.reduce<SectionsMap>(
    (map: SectionsMap, section: SectionType, index: number) => {
      const sectionHeight = estimateSectionHeight(
        section.totalImages,
        gridConfig
      );
      return {
        ...map,
        [section.sectionId]: {
          height: sectionHeight,
          top: gridConfig.sectionMargin + map['prev'].height,
          visible: false,
          index,
          segmentsMap: createSegmentsMap(section.segments, gridConfig),
        },
        prev: {
          ...map.prev,
          height: sectionHeight + gridConfig.sectionMargin + map['prev'].height,
        },
      } as SectionsMap;
    },
    { prev: { height: 0, top: 0, visible: false, segmentsMap: {} } }
  );

  delete map['prev'];

  return map;
};
