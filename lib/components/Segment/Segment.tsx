import type { SegmentProps } from 'lib/components/Segment/types';
import './segment.css';
import type { TileType } from 'lib/types';
import Tile from 'lib/components/Tile/Tile';

const Segment = ({ segment, map }: SegmentProps) => {
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
      <div className='segment-content'>
        {map.tiles.map((tile: TileType, index: number) => (
          <Tile
            key={segment.images[index].imageId}
            tile={tile}
            image={segment.images[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default Segment;
