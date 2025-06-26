import { render } from '@testing-library/react';
import Tile from 'lib/components/Tile/Tile';
import { ImageType, TileType } from 'lib/types';
import React from 'react';
import { describe, expect, it } from 'vitest';

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

    const { container } = render(<Tile tile={tile} image={image} />);
    expect(container).toMatchSnapshot();
  });
});
