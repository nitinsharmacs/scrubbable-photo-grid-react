import type { TileProps } from 'lib/components/Tile/types';
import { getScaleFactor } from 'lib/helpers';
import './tile.css';
import CheckButton from 'lib/components/CheckButton/CheckButton';

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
      <CheckButton
        active={ctx.selected}
        id={image.imageId}
        label='tile-checkicon'
        styles={{ position: 'absolute', left: '5px', top: '5px' }}
      />

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
