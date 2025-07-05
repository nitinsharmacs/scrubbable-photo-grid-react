import React from 'react';

import { render, screen } from '@testing-library/react';
import Segment from 'lib/components/Segment/Segment';
import { SegmentConfigType, SegmentType } from 'lib/types';
import { describe, expect, it, vi } from 'vitest';
import { SEGMENT_HEADER_HEIGHT } from 'lib/constants';
import { SegmentCtx } from 'lib/components/Segment/types';
import userEvent from '@testing-library/user-event';

describe('Segment', () => {
  const ctx: SegmentCtx = {
    selected: false,
    tiles: {
      image1: {
        selected: false,
      },
      something: {
        selected: false,
      },
      something2: {
        selected: false,
      },
    },
  };

  it('should match snapshot', () => {
    const segment: SegmentType = {
      segmentId: 'sec1',
      header: 'header',
      images: [],
    };

    const map: SegmentConfigType = {
      top: 0,
      width: 100,
      height: 100,
      headerHeight: SEGMENT_HEADER_HEIGHT,
      tiles: [],
    };

    const { container } = render(
      <Segment ctx={ctx} segment={segment} map={map} onSelect={null} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should have tiles', () => {
    const segment: SegmentType = {
      segmentId: 'sec1',
      header: 'header',
      images: [
        {
          imageId: 'something',
          imageurl: 'something',
          metadata: {
            width: 100,
            height: 100,
          },
        },
        {
          imageId: 'something2',
          imageurl: 'something',
          metadata: {
            width: 50,
            height: 100,
          },
        },
      ],
    };

    const map: SegmentConfigType = {
      top: 0,
      width: 100,
      height: 100,
      headerHeight: SEGMENT_HEADER_HEIGHT,
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

    const { container } = render(
      <Segment ctx={ctx} onSelect={null} segment={segment} map={map} />
    );
    expect(container.querySelectorAll('.tile').length).toBe(2);
  });

  it('should select tile', async () => {
    const segment: SegmentType = {
      segmentId: 'seg1',
      header: 'header',
      images: [
        {
          imageId: 'image1',
          imageurl: 'image/url',
          metadata: {
            width: 100,
            height: 100,
          },
        },
      ],
    };

    const map: SegmentConfigType = {
      top: 0,
      width: 100,
      height: 100,
      headerHeight: SEGMENT_HEADER_HEIGHT,
      tiles: [
        {
          width: 100,
          height: 100,
          top: 20,
          left: 20,
        },
      ],
    };

    const onSelectMock = vi.fn();

    render(
      <Segment ctx={ctx} onSelect={onSelectMock} segment={segment} map={map} />
    );

    const checkBox = screen.getByLabelText('tile-checkicon');

    await userEvent.click(checkBox);

    expect(onSelectMock).toBeCalledWith({
      segmentId: 'seg1',
      tilesId: ['image1'],
    });
  });
});
