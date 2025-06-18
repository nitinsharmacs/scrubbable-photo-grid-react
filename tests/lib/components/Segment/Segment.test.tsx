import React from 'react';

import { render } from '@testing-library/react';
import Segment from 'lib/components/Segment/Segment';
import { SegmentConfig, SegmentType } from 'lib/types';
import { describe, expect, it } from 'vitest';

describe('Segment', () => {
  it('should match snapshot', () => {
    const segment: SegmentType = {
      segmentId: 'sec1',
      header: 'header',
      images: [],
    };

    const map: SegmentConfig = {
      top: 0,
      width: 100,
      height: 100,
      tiles: [],
    };
    const { container } = render(<Segment segment={segment} map={map} />);
    expect(container).toMatchSnapshot();
  });

  it('should have tiles', () => {
    const segment: SegmentType = {
      segmentId: 'sec1',
      header: 'header',
      images: [
        {
          metadata: {
            width: 100,
            height: 100,
          },
        },
        {
          metadata: {
            width: 50,
            height: 100,
          },
        },
      ],
    };

    const map: SegmentConfig = {
      top: 0,
      width: 100,
      height: 100,
      tiles: [
        {
          width: 100,
          height: 100,
          top: 20,
          left: 20,
        },
        {
          width: 100,
          height: 100,
          top: 120,
          left: 120,
        },
      ],
    };

    const { container } = render(<Segment segment={segment} map={map} />);
    expect(container.querySelectorAll('.tile').length).toBe(2);
  });
});
