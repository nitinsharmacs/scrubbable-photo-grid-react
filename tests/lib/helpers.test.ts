import { estimateSectionHeight, initSectionsMap } from 'lib/helpers';
import { GridConfig, SectionType, SectionsMap } from 'lib/types';
import { describe, expect, it } from 'vitest';

describe('helpers', () => {
  it('should estimate section height', () => {
    const gridConfig: GridConfig = {
      containerWidth: 800,
      segmentMargin: 10,
      sectionMargin: 20,
      targetRowHeight: 150,
    };

    expect(estimateSectionHeight(1, gridConfig)).toBe(150);
    expect(estimateSectionHeight(15, gridConfig)).toBe(450);
  });

  it('should create initial map for sections', () => {
    const gridConfig: GridConfig = {
      containerWidth: 800,
      segmentMargin: 10,
      sectionMargin: 20,
      targetRowHeight: 150,
    };

    const sections: SectionType[] = [
      { sectionId: 'sec1', totalImages: 1, segments: [] },
      { sectionId: 'sec2', totalImages: 16, segments: [] },
      { sectionId: 'sec3', totalImages: 160, segments: [] },
    ];

    const expectedMap: SectionsMap = {
      sec1: { top: 20, height: 150, visible: false, index: 0 },
      sec2: { top: 190, height: 600, visible: false, index: 1 },
      sec3: { top: 810, height: 4800, visible: false, index: 2 },
      prev: { height: 5610, top: 0, visible: false },
    };
    expect(initSectionsMap(sections, gridConfig)).toStrictEqual(expectedMap);
  });
});
