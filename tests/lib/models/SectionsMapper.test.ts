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
      {
        sectionId: 'sec1',
        totalImages: 1,
        segments: [],
        header: 'sec1 header',
      },
      {
        sectionId: 'sec2',
        totalImages: 16,
        segments: [],
        header: 'sec2 header',
      },
      {
        sectionId: 'sec3',
        totalImages: 160,
        segments: [],
        header: 'sec3 header',
      },
    ];
  });

  it<LocalTestContext>('should create initial sections map', ({
    mapper,
    sections,
  }) => {
    const expectedMap: SectionsMapType = {
      sec1: {
        top: 20,
        height: 200,
        visible: false,
        index: 0,
        segmentsMap: {},
        headerHeight: SectionsMapper.HEADER_HEIGHT,
      },
      sec2: {
        top: 260,
        height: 650,
        visible: false,
        index: 1,
        segmentsMap: {},
        headerHeight: SectionsMapper.HEADER_HEIGHT,
      },
      sec3: {
        top: 950,
        height: 4850,
        visible: false,
        index: 2,
        segmentsMap: {},
        headerHeight: SectionsMapper.HEADER_HEIGHT,
      },
    };
    expect(mapper.createMap(sections)).toStrictEqual(expectedMap);
  });

  it<LocalTestContext>('should return section config for given section id', ({
    mapper,
  }) => {
    expect(mapper.getSectionConfig('sec1')).toStrictEqual({});

    const sections: SectionType[] = [
      {
        sectionId: 'sec1',
        totalImages: 1,
        segments: [],
        header: 'sec1 header',
      },
    ];

    mapper.createMap(sections);
    expect(mapper.getSectionConfig('sec1')).toStrictEqual({
      top: 20,
      height: 200,
      visible: false,
      index: 0,
      headerHeight: SectionsMapper.HEADER_HEIGHT,
      segmentsMap: {},
    });
  });

  it<LocalTestContext>('should update section map based when visible', ({
    mapper,
  }) => {
    const section: SectionType = {
      sectionId: 'sec1',
      totalImages: 1,
      header: 'sec1 header',
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
              imageurl: 'some url',
              imageId: 'some id',
            },
          ],
        },
      ],
    };
    mapper.createMap([section]);

    const expected: SectionConfigType = {
      top: 20,
      height: 240,
      visible: true,
      index: 0,
      headerHeight: SectionsMapper.HEADER_HEIGHT,
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
    const section: SectionType = {
      sectionId: 'sec1',
      totalImages: 1,
      header: 'sec1 header',
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
              imageId: 'some id',
              imageurl: 'some url',
            },
          ],
        },
      ],
    };
    mapper.createMap([section]);

    const expected: SectionConfigType = {
      top: 20,
      height: 200,
      visible: false,
      index: 0,
      segmentsMap: {},
      headerHeight: SectionsMapper.HEADER_HEIGHT,
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
        height: 200,
        visible: false,
        index: 0,
        segmentsMap: {},
        headerHeight: SectionsMapper.HEADER_HEIGHT,
      },
      sec2: {
        top: 262,
        height: 650,
        visible: false,
        index: 1,
        segmentsMap: {},
        headerHeight: SectionsMapper.HEADER_HEIGHT,
      },
      sec3: {
        top: 952,
        height: 4850,
        visible: false,
        index: 2,
        segmentsMap: {},
        headerHeight: SectionsMapper.HEADER_HEIGHT,
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
        header: 'sec1 header',
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
                imageId: 'something',
                imageurl: 'someurl',
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
      {
        sectionId: 'sec2',
        totalImages: 16,
        segments: [],
        header: 'sec2 header',
      },
      {
        sectionId: 'sec3',
        totalImages: 160,
        segments: [],
        header: 'sec3 header',
      },
    ];
    mapper.createMap(sections);

    const expectedMap: SectionConfigType = {
      top: 20,
      height: 270,
      visible: false,
      index: 0,
      headerHeight: SectionsMapper.HEADER_HEIGHT,
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
          top: 200,
          width: 800,
        },
      },
    };

    expect(mapper.recomputeSectionMap(sections[0])).toStrictEqual(expectedMap);
  });
});
