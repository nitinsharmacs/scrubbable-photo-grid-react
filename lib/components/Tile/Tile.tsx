import type { TileProps } from 'lib/components/Tile/types';
import './tile.css';

const Tile = ({ tile }: TileProps) => {
  return (
    <div
      className='tile'
      style={{
        width: `${tile.width}px`,
        height: `${tile.height}px`,
        left: `${tile.left}px`,
        top: `${tile.top}px`,
      }}
    ></div>
  );
};

export default Tile;
