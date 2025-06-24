import createJustifiedLayout from 'justified-layout';

import type {
  GridConfigType,
  ImageType,
  SectionsMapType,
  SegmentType,
  SegmentsMapType,
  TileType,
} from 'lib/types';

const IMAGE_ASPECT_RATIO: number = 3 / 2;
const COALESCING_FACTOR: number = 7 / 10;

export const estimateSectionHeight = (
  totalImages: number,
  config: GridConfigType
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
  gridConfig: GridConfigType
): SegmentsMapType => {
  const map = segments.reduce<SegmentsMapType>(
    (map: SegmentsMapType, segment: SegmentType) => {
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
      } as SegmentsMapType;
    },
    { prev: { height: 0, top: 0, width: 0, tiles: [] } }
  );

  delete map['prev'];

  return map;
};

export const updateSectionsTop = (
  sectionsMap: SectionsMapType,
  toBeUpdatedSectionsId: string[],
  delta: number
): SectionsMapType => {
  return toBeUpdatedSectionsId.reduce<SectionsMapType>(
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
