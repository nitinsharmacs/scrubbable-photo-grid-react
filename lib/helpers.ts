import createJustifiedLayout from 'justified-layout';
import {
  IMAGE_ASPECT_RATIO,
  COALESCING_FACTOR,
  SEGMENT_HEADER_HEIGHT,
} from 'lib/constants';

import type {
  GridConfigType,
  ImageType,
  SegmentType,
  SegmentsMapType,
  TileType,
} from 'lib/types';

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
          height: segmentHeight + SEGMENT_HEADER_HEIGHT,
          width: gridConfig.containerWidth,
          headerHeight: SEGMENT_HEADER_HEIGHT,
          tiles: segmentLayout.boxes as TileType[],
        },
        prev: {
          ...map.prev,
          height:
            segmentHeight +
            SEGMENT_HEADER_HEIGHT +
            +gridConfig.segmentMargin * 2 +
            map['prev'].height,
        },
      } as SegmentsMapType;
    },
    {
      prev: {
        height: 0,
        top: 0,
        width: 0,
        tiles: [],
        headerHeight: SEGMENT_HEADER_HEIGHT,
      },
    }
  );

  delete map['prev'];

  return map;
};
