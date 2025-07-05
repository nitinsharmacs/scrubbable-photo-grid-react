import { toggleTileInCtx } from 'lib/components/Section/section.hooks';
import { SectionCtx } from 'lib/components/Section/types';
import { describe, expect, it } from 'vitest';

describe('toggleTileInCtx', () => {
  it('should toggle a tile in given section context', () => {
    const ctx: SectionCtx = {
      selected: false,
      segments: {
        seg1: {
          selected: false,
          tiles: {
            tile1: {
              selected: false,
            },
          },
        },
      },
    };

    toggleTileInCtx(ctx, 'seg1', ['tile1']);

    expect(ctx.segments.seg1.tiles.tile1.selected).toBe(true);
  });
});
