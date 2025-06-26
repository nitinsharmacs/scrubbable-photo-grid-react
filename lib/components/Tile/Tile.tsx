import type { TileProps } from 'lib/components/Tile/types';
import './tile.css';

const Tile = ({ tile, image }: TileProps) => {
  return (
    <div
      className='tile'
      id={image.imageId}
      style={{
        width: `${tile.width}px`,
        height: `${tile.height}px`,
        left: `${tile.left}px`,
        top: `${tile.top}px`,
      }}
    >
      <figure>
        <img src={image.imageurl} />
      </figure>
    </div>
  );
};

export default Tile;
