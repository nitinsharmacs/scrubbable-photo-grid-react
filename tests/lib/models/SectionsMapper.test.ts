import { SectionsMapper } from 'lib/models/SectionsMapper';
import {
  GridConfigType,
  SectionConfigType,
  SectionsMapType,
  SectionType,
} from 'lib/types';
import { beforeEach, describe, expect, it } from 'vitest';

interface LocalTestContext {
  mapper: SectionsMapper;
  sections: SectionType[];
}

describe('SectionsMapper', () => {
  const gridConfig: GridConfigType = {
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
    const expectedMap: SectionsMapType = {
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

  it<LocalTestContext>('should update section map based when visible', ({
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

    const expected: SectionConfigType = {
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

  it<LocalTestContext>('should update section map when invisible', ({
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

    const expected: SectionConfigType = {
      top: 20,
      height: 150,
      visible: false,
      index: 0,
      segmentsMap: {},
    };
    const actual = mapper.updateForSection(section, false);

    expect(actual).toStrictEqual(expected);
  });

  it<LocalTestContext>('should update tops of next sections', ({
    mapper,
    sections,
  }) => {
    mapper.createMap(sections);

    const expected: SectionsMapType = {
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
  it<LocalTestContext>('should recompute section map', ({ mapper }) => {
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
    mapper.createMap(sections);

    const expectedMap: SectionConfigType = {
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

    expect(mapper.recomputeSectionMap(sections[0])).toStrictEqual(expectedMap);
  });
});
