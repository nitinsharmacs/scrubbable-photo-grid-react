import { SectionsMapper } from 'lib/models/SectionsMapper';
import { GridConfig, SectionConfig, SectionsMap, SectionType } from 'lib/types';
import { beforeEach, describe, expect, it } from 'vitest';

interface LocalTestContext {
  mapper: SectionsMapper;
  sections: SectionType[];
}

describe('SectionsMapper', () => {
  const gridConfig: GridConfig = {
    containerWidth: 800,
    segmentMargin: 10,
    sectionMargin: 20,
    targetRowHeight: 150,
  };

  beforeEach<LocalTestContext>((context) => {
    context.mapper = new SectionsMapper(gridConfig);
    context.sections = [
      { sectionId: 'sec1', totalImages: 1, segments: [] },
      { sectionId: 'sec2', totalImages: 16, segments: [] },
      { sectionId: 'sec3', totalImages: 160, segments: [] },
    ];
  });

  it<LocalTestContext>('should create initial sections map', ({
    mapper,
    sections,
  }) => {
    const expectedMap: SectionsMap = {
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
    expect(mapper.createMap(sections)).toStrictEqual(expectedMap);
  });

  it<LocalTestContext>('should return section config for given section id', ({
    mapper,
  }) => {
    expect(mapper.getSectionConfig('sec1')).toStrictEqual({});

    const sections: SectionType[] = [
      { sectionId: 'sec1', totalImages: 1, segments: [] },
    ];

    mapper.createMap(sections);
    expect(mapper.getSectionConfig('sec1')).toStrictEqual({
      top: 20,
      height: 150,
      visible: false,
      index: 0,
      segmentsMap: {},
    });
  });

  it<LocalTestContext>('should update section map based on visibility', ({
    mapper,
  }) => {
    const section = {
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
      ],
    };
    mapper.createMap([section]);

    const expected: SectionConfig = {
      top: 20,
      height: 180,
      visible: true,
      index: 0,
      segmentsMap: {
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
      },
    };
    const actual = mapper.updateForSection(section, true);

    expect(actual).toStrictEqual(expected);
  });

  it<LocalTestContext>('should update section map based on visibility [Need to look again]', ({
    mapper,
  }) => {
    const section = {
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
      ],
    };
    mapper.createMap([section]);

    const expected: SectionConfig = {
      top: 20,
      height: 180,
      visible: false,
      index: 0,
      segmentsMap: {
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
      },
    };
    const actual = mapper.updateForSection(section, false);

    expect(actual).toStrictEqual(expected);
  });

  it<LocalTestContext>('should update tops of next sections', ({
    mapper,
    sections,
  }) => {
    mapper.createMap(sections);

    const expected: SectionsMap = {
      sec1: {
        top: 20,
        height: 150,
        visible: false,
        index: 0,
        segmentsMap: {},
      },
      sec2: {
        top: 192,
        height: 600,
        visible: false,
        index: 1,
        segmentsMap: {},
      },
      sec3: {
        top: 812,
        height: 4800,
        visible: false,
        index: 2,
        segmentsMap: {},
      },
    };

    const actual = mapper.updateSectionsTopFrom(1, 2, sections);

    expect(actual).toStrictEqual(expected);
  });
});
