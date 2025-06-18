import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Section from 'lib/components/Section/Section';
import type { GridConfig, SectionConfig, SectionType } from 'lib/types';

describe('Section', () => {
  const gridConfig: GridConfig = {
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
    };

    const sectionConfig: SectionConfig = {
      top: 20,
      height: 150,
      visible: false,
      index: 0,
      segmentsMap: {},
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

    const sectionConfig: SectionConfig = {
      top: 20,
      height: 150,
      visible: true,
      index: 0,
      segmentsMap: {
        seg1: {
          top: 0,
          width: 100,
          height: 110,
          tiles: [],
        },
        seg2: {
          top: 0,
          width: 100,
          height: 110,
          tiles: [],
        },
      },
    };

    const { container } = render(
      <Section section={section} map={sectionConfig} config={gridConfig} />
    );

    expect(container.querySelectorAll('.segment').length).toBe(2);
  });
});
