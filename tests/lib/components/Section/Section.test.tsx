import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Section from 'lib/components/Section/Section';
import type { GridConfig, SectionConfig, SectionType } from 'lib/types';

describe('Section', () => {
  it('should render the section', () => {
    const gridConfig: GridConfig = {
      containerWidth: 800,
      segmentMargin: 10,
      sectionMargin: 20,
      targetRowHeight: 150,
    };

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
    };
    const { container } = render(
      <Section section={section} map={sectionConfig} config={gridConfig} />
    );

    expect(container).toMatchSnapshot();
  });
});
