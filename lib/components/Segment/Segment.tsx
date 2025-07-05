import React, { useCallback } from 'react';
import type { SegmentProps } from 'lib/components/Segment/types';
import './segment.css';
import type { TileType } from 'lib/types';
import Tile from 'lib/components/Tile/Tile';
import CheckButton from 'lib/components/CheckButton/CheckButton';

const isTile = (
  ele: HTMLElement | { getAttribute: (name: string) => string }
): boolean => {
  return ele.getAttribute('aria-label') === 'tile-checkicon';
};

const Segment = ({ segment, map, ctx, onSelect }: SegmentProps) => {
  const selectHandler = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;

    if (isTile(target)) {
      const tileId: string = target.getAttribute('data-tile-id') || '';
      return onSelect({ segmentId: segment.segmentId, tilesId: [tileId] });
    }
  }, []);

  return (
    <div
      className='segment'
      id={segment.segmentId}
      style={{
        width: `${map.width}px`,
        height: `${map.height}px`,
        top: `${map.top}px`,
      }}
      onClick={selectHandler}
    >
      <div className='segment-header' style={{ height: map.headerHeight }}>
        <CheckButton
          active={ctx.selected}
          id={segment.segmentId}
          label='segment-checkicon'
        />
        <h3>{segment.header}</h3>
      </div>
      <div className='segment-content'>
        {map.tiles.map((tile: TileType, index: number) => (
          <Tile
            key={segment.images[index].imageId}
            tile={tile}
            image={segment.images[index]}
            ctx={ctx.tiles[segment.images[index].imageId]}
          />
        ))}
      </div>
    </div>
  );
};

export default Segment;
