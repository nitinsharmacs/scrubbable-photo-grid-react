import { toggleSelectInCtx } from 'lib/components/Section/section.hooks';
import { SectionCtx } from 'lib/components/Section/types';
import { describe, expect, it } from 'vitest';

describe('toggleSelectInCtx', () => {
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

    toggleSelectInCtx(ctx, 'seg1', ['tile1']);

    expect(ctx.segments.seg1.tiles.tile1.selected).toBe(true);

    toggleSelectInCtx(ctx, 'seg1', ['tile1']);

    expect(ctx.segments.seg1.tiles.tile1.selected).toBe(false);
  });

  it('should toggle multiple tiles in given section context', () => {
    const ctx: SectionCtx = {
      selected: false,
      segments: {
        seg1: {
          selected: false,
          tiles: {
            tile1: {
              selected: false,
            },
            tile2: {
              selected: false,
            },
            tile3: {
              selected: false,
            },
          },
        },
      },
    };

    toggleSelectInCtx(ctx, 'seg1', ['tile1', 'tile3']);

    expect(ctx.segments.seg1.tiles.tile1.selected).toBe(true);
    expect(ctx.segments.seg1.tiles.tile3.selected).toBe(true);
  });

  it('should toggle all tiles in given section context', () => {
    const ctx: SectionCtx = {
      selected: false,
      segments: {
        seg1: {
          selected: false,
          tiles: {
            tile1: {
              selected: false,
            },
            tile2: {
              selected: false,
            },
            tile3: {
              selected: false,
            },
          },
        },
      },
    };

    toggleSelectInCtx(ctx, 'seg1', ['tile1', 'tile3', 'tile2']);

    expect(ctx.segments.seg1.tiles.tile1.selected).toBe(true);
    expect(ctx.segments.seg1.tiles.tile3.selected).toBe(true);
    expect(ctx.segments.seg1.tiles.tile2.selected).toBe(true);
    expect(ctx.segments.seg1.selected).toBe(true);

    toggleSelectInCtx(ctx, 'seg1', ['tile1', 'tile3', 'tile2']);

    expect(ctx.segments.seg1.tiles.tile1.selected).toBe(false);
    expect(ctx.segments.seg1.tiles.tile3.selected).toBe(false);
    expect(ctx.segments.seg1.tiles.tile2.selected).toBe(false);
    expect(ctx.segments.seg1.selected).toBe(false);
  });

  it('should unselect segment for atleast a tile unselect', () => {
    const ctx: SectionCtx = {
      selected: false,
      segments: {
        seg1: {
          selected: true,
          tiles: {
            tile1: {
              selected: true,
            },
            tile2: {
              selected: true,
            },
            tile3: {
              selected: true,
            },
          },
        },
      },
    };

    toggleSelectInCtx(ctx, 'seg1', ['tile1']);

    expect(ctx.segments.seg1.selected).toBe(false);
  });
});
