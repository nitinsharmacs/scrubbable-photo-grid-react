import createJustifiedLayout from 'justified-layout';
import type { SectionCtx } from 'lib/components/Section/types';
import type { SegmentCtx } from 'lib/components/Segment/types';
import {
  IMAGE_ASPECT_RATIO,
  COALESCING_FACTOR,
  SEGMENT_HEADER_HEIGHT,
} from 'lib/constants';

import type {
  GridConfigType,
  ImageType,
  SectionType,
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
        tilesMap: {},
      },
    }
  );

  delete map['prev'];

  return map;
};

export const createSectionContext = (section: SectionType): SectionCtx => {
  return section.segments.reduce<SectionCtx>(
    (ctx: SectionCtx, segment: SegmentType) => {
      const segmentCtx = createSegmentContext(segment);

      ctx.segments[segment.segmentId] = segmentCtx;

      return ctx;
    },
    {
      selected: false,
      segments: {},
    }
  );
};

export const createSegmentContext = (segment: SegmentType): SegmentCtx => {
  return segment.images.reduce<SegmentCtx>(
    (ctx, img: ImageType) => {
      ctx.tiles[img.imageId] = {
        selected: false,
      };
      return ctx;
    },
    { selected: false, tiles: {} }
  );
};

export const getScaleFactor = (
  width: number,
  xOffset: number,
  height: number,
  yOffset: number
): string => {
  const x = ((width - xOffset) / width).toFixed(2);
  const y = ((height - yOffset) / height).toFixed(2);
  return `${x},${y}`;
};
