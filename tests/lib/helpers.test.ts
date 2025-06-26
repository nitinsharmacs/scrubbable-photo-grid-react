import { createSegmentsMap, estimateSectionHeight } from 'lib/helpers';
import { GridConfigType, SegmentType, SegmentsMapType } from 'lib/types';
import { describe, expect, it } from 'vitest';

describe('helpers', () => {
  const gridConfig: GridConfigType = {
    containerWidth: 800,
    segmentMargin: 10,
    sectionMargin: 20,
    targetRowHeight: 150,
  };
  it('should estimate section height', () => {
    expect(estimateSectionHeight(1, gridConfig)).toBe(150);
    expect(estimateSectionHeight(15, gridConfig)).toBe(450);
  });

  it('should create segments map', () => {
    const segments: SegmentType[] = [
      {
        segmentId: 'seg-1',
        header: 'segment 1',
        images: [
          {
            metadata: {
              width: 100,
              height: 100,
              orientation: 1,
            },
            imageurl: 'some url',
            imageId: 'some id',
          },
        ],
      },
      {
        segmentId: 'seg-2',
        header: 'segment 2',
        images: [],
      },
    ];

    const expected: SegmentsMapType = {
      'seg-1': {
        top: 10,
        width: 800,
        height: 170,
        tiles: [
          {
            width: 150,
            height: 150,
            top: 10,
            left: 10,
            aspectRatio: 1,
          },
        ],
      },
      'seg-2': {
        top: 200,
        width: 800,
        height: 10,
        tiles: [],
      },
    };
    expect(createSegmentsMap(segments, gridConfig)).toStrictEqual(expected);
  });
});
