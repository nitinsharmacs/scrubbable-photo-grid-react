import type { TileProps } from 'lib/components/Tile/types';
import './tile.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const getScaleFactor = (
  width: number,
  xOffset: number,
  height: number,
  yOffset: number
): string => {
  const x = ((width - xOffset) / width).toFixed(2);
  const y = ((height - yOffset) / height).toFixed(2);
  return `${x},${y}`;
};

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
      <CheckCircleIcon className='tile-checkicon' />
      <figure
        className='tile-image active'
        style={{
          transform: `scale(${getScaleFactor(
            tile.width,
            20,
            tile.height,
            20
          )})`,
        }}
      >
        <img src={image.imageurl} />
      </figure>
    </div>
  );
};

export default Tile;
