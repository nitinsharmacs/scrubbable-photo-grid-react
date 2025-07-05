import type { TileCtx } from 'lib/components/Tile/types';
import type { SegmentConfigType, SegmentType } from 'lib/types';

export type SegmentClickEvent = {
  segmentId: string;
  tilesId: string[];
};

export type SelectHandler = (event: SegmentClickEvent) => void;
export interface SegmentProps {
  segment: SegmentType;
  map: SegmentConfigType;
  ctx: SegmentCtx;
  onSelect: SelectHandler;
}

export type SegmentCtx = {
  selected: boolean;
  tiles: {
    [key: string]: TileCtx;
  };
};
