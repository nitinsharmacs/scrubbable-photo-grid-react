import {
  createSegmentsMap,
  estimateSectionHeight,
  recomputeSectionMap,
} from 'lib/helpers';
import {
  GridConfig,
  SectionConfig,
  SectionType,
  SectionsMap,
  SegmentType,
  SegmentsMap,
} from 'lib/types';
import { describe, expect, it } from 'vitest';

describe('helpers', () => {
  const gridConfig: GridConfig = {
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
          },
        ],
      },
      {
        segmentId: 'seg-2',
        header: 'segment 2',
        images: [],
      },
    ];

    const expected: SegmentsMap = {
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
        top: 190,
        width: 800,
        height: 10,
        tiles: [],
      },
    };
    expect(createSegmentsMap(segments, gridConfig)).toStrictEqual(expected);
  });

  it('should recompute section map', () => {
    const sections: SectionType[] = [
      {
        sectionId: 'sec1',
        totalImages: 1,
        segments: [
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
              },
            ],
          },
          {
            segmentId: 'seg-2',
            header: 'segment 2',
            images: [],
          },
        ],
      },
      { sectionId: 'sec2', totalImages: 16, segments: [] },
      { sectionId: 'sec3', totalImages: 160, segments: [] },
    ];

    const sectionsMap: SectionsMap = {
      sec1: {
        top: 20,
        height: 150,
        visible: false,
        index: 0,
        segmentsMap: {},
      },
      sec2: {
        top: 190,
        height: 600,
        visible: false,
        index: 1,
        segmentsMap: {},
      },
      sec3: {
        top: 810,
        height: 4800,
        visible: false,
        index: 2,
        segmentsMap: {},
      },
    };

    const expectedMap: SectionConfig = {
      top: 20,
      height: 200,
      visible: false,
      index: 0,
      segmentsMap: {
        'seg-1': {
          height: 170,
          tiles: [
            {
              aspectRatio: 1,
              height: 150,
              left: 10,
              top: 10,
              width: 150,
            },
          ],
          top: 10,
          width: 800,
        },
        'seg-2': {
          height: 10,
          tiles: [],
          top: 190,
          width: 800,
        },
      },
    };

    expect(
      recomputeSectionMap(sectionsMap['sec1'], sections[0], gridConfig)
    ).toStrictEqual(expectedMap);
  });
});
