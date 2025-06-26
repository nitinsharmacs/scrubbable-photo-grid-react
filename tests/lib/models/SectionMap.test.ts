import { SectionMap } from 'lib/models/SectionMap';
import { GridConfigType, SegmentsMapType } from 'lib/types';
import { describe, expect, it } from 'vitest';

describe('SectionMap', () => {
  const gridConfig: GridConfigType = {
    containerWidth: 800,
    segmentMargin: 10,
    sectionMargin: 20,
    targetRowHeight: 150,
  };

  const segmentsMap: SegmentsMapType = {
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
  };

  it('should get height of section', () => {
    const sectionMapper = new SectionMap(gridConfig, segmentsMap);

    expect(sectionMapper.height).toBe(220);
  });
});
