import { produce } from 'immer';
import type { SectionCtx } from 'lib/components/Section/types';
import type {
  SegmentClickEvent,
  SelectHandler,
} from 'lib/components/Segment/types';
import { useCallback, useState } from 'react';

export const toggleSelectInCtx = (
  ctx: SectionCtx,
  segmentId: string,
  tilesId: string[]
): SectionCtx => {
  const segment = ctx.segments[segmentId];
  const tiles = Object.values(segment.tiles);

  // select all mode
  if (tilesId.length === tiles.length) {
    let status = true;
    if (segment.selected) {
      status = false;
    }

    segment.selected = status;

    tilesId.forEach((tileId) => {
      segment.tiles[tileId].selected = status;
    });

    return ctx;
  }

  // single select mode

  tilesId.forEach((tileId) => {
    segment.tiles[tileId].selected = !segment.tiles[tileId].selected;
  });

  segment.selected =
    tiles.filter((tile) => tile.selected).length === tiles.length;

  return ctx;
};

export const useSectionContext = (
  initialContext: SectionCtx
): [
  SectionCtx,
  { selectHandler: SelectHandler; clearSelection: () => void }
] => {
  const [ctx, updateCtx] = useState<SectionCtx>(initialContext);

  const selectHandler = useCallback(
    ({ segmentId, tilesId }: SegmentClickEvent) => {
      updateCtx(
        produce((prevCtx) => toggleSelectInCtx(prevCtx, segmentId, tilesId))
      );
    },
    []
  );

  const clearSelection = useCallback(() => {
    updateCtx(initialContext);
  }, []);

  return [ctx, { selectHandler, clearSelection }];
};
