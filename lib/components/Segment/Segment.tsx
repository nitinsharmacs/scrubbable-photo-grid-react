import React, { useCallback } from 'react';
import type { SegmentProps } from 'lib/components/Segment/types';
import './segment.css';
import type { TileType } from 'lib/types';
import Tile from 'lib/components/Tile/Tile';

const isTile = (ele: HTMLElement): boolean => {
  return ele.getAttribute('aria-label') === 'tile-checkbox';
};

const Segment = ({ segment, map, ctx, onSelect }: SegmentProps) => {
  const selectHandler = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (isTile(target)) {
      const tileId: string = target.getAttribute('data-tile-id') || '';
      onSelect({ segmentId: segment.segmentId, tileId });
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
    >
      <div className='segment-header' style={{ height: map.headerHeight }}>
        <h3>{segment.header}</h3>
      </div>
      <div className='segment-content' onClick={selectHandler}>
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
