import type { TileProps } from 'lib/components/Tile/types';
import './tile.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getScaleFactor } from 'lib/helpers';

const Tile = ({ tile, image, ctx }: TileProps) => {
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
      <div
        className={['tile-checkicon', ctx.selected ? 'active' : ''].join(' ')}
        data-tile-id={image.imageId}
        aria-label='tile-checkicon'
      >
        <CheckCircleIcon />
      </div>
      <figure
        className='tile-image'
        style={
          ctx.selected
            ? {
                transform: `scale(${getScaleFactor(
                  tile.width,
                  30,
                  tile.height,
                  30
                )})`,
              }
            : {}
        }
      >
        <img src={image.imageurl} />
      </figure>
    </div>
  );
};

export default Tile;
