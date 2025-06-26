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
      {map.tiles.map((tile: TileType, index: number) => (
        <Tile
          key={segment.images[index].imageId}
          tile={tile}
          image={segment.images[index]}
        />
      ))}
    </div>
  );
};

export default Segment;
