import type { ImageType, TileType } from 'lib/types';

export interface TileProps {
  tile: TileType;
  image: ImageType;
  ctx: TileCtx;
}

export type TileCtx = {
  selected: boolean;
};
