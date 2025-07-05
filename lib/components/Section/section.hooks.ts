import { produce } from 'immer';
import type { SectionCtx } from 'lib/components/Section/types';
import type {
  SegmentClickEvent,
  SelectHandler,
} from 'lib/components/Segment/types';
import { useCallback, useState } from 'react';

export const toggleTileInCtx = (
  ctx: SectionCtx,
  segmentId: string,
  tilesId: string[]
): SectionCtx => {
  const segment = ctx.segments[segmentId];
  tilesId.forEach((tileId) => {
    segment.tiles[tileId].selected = !segment.tiles[tileId].selected;
  });
  return ctx;
};

export const useSectionContext = (
  initialContext: SectionCtx
): [SectionCtx, { selectHandler: SelectHandler }] => {
  const [ctx, updateCtx] = useState<SectionCtx>(initialContext);

  const selectHandler = useCallback(
    ({ segmentId, tilesId }: SegmentClickEvent) => {
      updateCtx(
        produce((prevCtx) => toggleTileInCtx(prevCtx, segmentId, tilesId))
      );
    },
    []
  );

  return [ctx, { selectHandler }];
};
