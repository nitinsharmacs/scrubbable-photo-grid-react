import type { TileCtx } from 'lib/components/Tile/types';
import type { SegmentConfigType, SegmentType } from 'lib/types';

export interface SegmentProps {
  segment: SegmentType;
  map: SegmentConfigType;
  ctx: SegmentCtx;
}

export type SegmentCtx = {
  selected: boolean;
  tiles: {
    [key: string]: TileCtx;
  };
};
