import { describe, expect, it, vi, afterEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Tile from 'lib/components/Tile/Tile';
import { ImageType, TileType } from 'lib/types';
import { getScaleFactor } from 'lib/helpers';

vi.mock('lib/helpers', async () => {
  return {
    getScaleFactor: vi.fn().mockReturnValue('scale factor'),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Tile', () => {
  it('should match snapshot', () => {
    const tile: TileType = {
      height: 0,
      width: 0,
      top: 0,
      left: 0,
    };
    const image: ImageType = {
      metadata: {
        width: 0,
        height: 0,
        orientation: 0,
      },
      imageurl: 'somehing',
      imageId: 'something1',
    };

    const { container } = render(
      <Tile tile={tile} image={image} ctx={{ selected: false }} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should check tile if selected', () => {
    const tile: TileType = {
      height: 0,
      width: 0,
      top: 0,
      left: 0,
    };
    const image: ImageType = {
      metadata: {
        width: 0,
        height: 0,
        orientation: 0,
      },
      imageurl: 'somehing',
      imageId: 'something1',
    };

    render(<Tile tile={tile} image={image} ctx={{ selected: true }} />);
    expect(screen.getByLabelText('tile-checkicon')).toHaveAttribute(
      'class',
      'checkbutton active'
    );
    expect(screen.getByRole('figure')).toHaveStyle(
      'transform: scale(scale factor)'
    );
    expect(getScaleFactor).toBeCalledWith(0, 30, 0, 30);
  });
});
