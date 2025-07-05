import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Section from 'lib/components/Section/Section';
import type { GridConfigType, SectionConfigType, SectionType } from 'lib/types';
import { SECTION_HEADER_HEIGHT, SEGMENT_HEADER_HEIGHT } from 'lib/constants';
import userEvent from '@testing-library/user-event';

describe('Section', () => {
  const gridConfig: GridConfigType = {
    containerWidth: 800,
    segmentMargin: 10,
    sectionMargin: 20,
    targetRowHeight: 150,
  };
  it('should match snapshot', () => {
    const section: SectionType = {
      sectionId: 'sec1',
      totalImages: 1,
      segments: [],
      header: 'section 1',
    };

    const sectionConfig: SectionConfigType = {
      top: 20,
      height: 150,
      visible: false,
      index: 0,
      segmentsMap: {},
      headerHeight: SECTION_HEADER_HEIGHT,
    };
    const { container } = render(
      <Section section={section} map={sectionConfig} config={gridConfig} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render segments when visible', () => {
    const section: SectionType = {
      sectionId: 'sec1',
      totalImages: 1,
      header: 'section 1',
      segments: [
        {
          segmentId: 'seg1',
          header: 'seg 1',
          images: [],
        },
        {
          segmentId: 'seg2',
          header: 'seg 2',
          images: [],
        },
      ],
    };

    const sectionConfig: SectionConfigType = {
      top: 20,
      height: 150,
      visible: true,
      index: 0,
      headerHeight: SECTION_HEADER_HEIGHT,
      segmentsMap: {
        seg1: {
          top: 0,
          width: 100,
          height: 110,
          tiles: [],
          headerHeight: SEGMENT_HEADER_HEIGHT,
        },
        seg2: {
          top: 0,
          width: 100,
          height: 110,
          tiles: [],
          headerHeight: SEGMENT_HEADER_HEIGHT,
        },
      },
    };

    const { container } = render(
      <Section section={section} map={sectionConfig} config={gridConfig} />
    );

    expect(container.querySelectorAll('.segment').length).toBe(2);
  });

  it.only('should select tiles', async () => {
    const section: SectionType = {
      sectionId: 'sec1',
      totalImages: 1,
      header: 'section 1',
      segments: [
        {
          segmentId: 'seg1',
          header: 'seg 1',
          images: [
            {
              imageId: 'something',
              imageurl: 'something',
              metadata: {
                width: 100,
                height: 100,
              },
            },
          ],
        },
        {
          segmentId: 'seg2',
          header: 'seg 2',
          images: [
            {
              imageId: 'something2',
              imageurl: 'something',
              metadata: {
                width: 50,
                height: 100,
              },
            },
          ],
        },
      ],
    };

    const sectionConfig: SectionConfigType = {
      top: 20,
      height: 150,
      visible: true,
      index: 0,
      headerHeight: SECTION_HEADER_HEIGHT,
      segmentsMap: {
        seg1: {
          top: 0,
          width: 100,
          height: 110,
          tiles: [
            {
              width: 100,
              height: 100,
              top: 20,
              left: 20,
            },
          ],
          headerHeight: SEGMENT_HEADER_HEIGHT,
        },
        seg2: {
          top: 0,
          width: 100,
          height: 110,
          tiles: [
            {
              width: 100,
              height: 100,
              top: 120,
              left: 120,
            },
          ],
          headerHeight: SEGMENT_HEADER_HEIGHT,
        },
      },
    };

    render(
      <Section section={section} map={sectionConfig} config={gridConfig} />
    );

    const checkboxes = screen.getAllByLabelText('tile-checkicon');

    // click first time
    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute('class', 'tile-checkicon active');

    // click first time, should unselect
    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute('class', 'tile-checkicon ');
  });
});
