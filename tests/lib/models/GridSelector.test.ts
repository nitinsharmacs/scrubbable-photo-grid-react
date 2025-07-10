import { SectionCtx } from 'lib/components/Section/types';
import GridSelector, { SectionSelection } from 'lib/models/GridSelector';
import { describe, expect, it } from 'vitest';

describe('sectionCtxToSelectPayload', () => {
  it('should convert section context to select payload', () => {
    const ctx: SectionCtx = {
      selected: false,
      segments: {
        seg1: {
          selected: false,
          tiles: {
            tile1: {
              selected: true,
            },
            tile2: {
              selected: true,
            },
            tile3: {
              selected: false,
            },
          },
        },
      },
    };

    const expected: SectionSelection = {
      seg1: ['tile1', 'tile2'],
    };

    const selector = new GridSelector();

    const actual = selector.sectionCtxToSelection(ctx);

    expect(actual).toStrictEqual(expected);
  });

  it('should convert context to payload with segment with tiles', () => {
    const ctx: SectionCtx = {
      selected: false,
      segments: {
        seg1: {
          selected: false,
          tiles: {
            tile1: {
              selected: true,
            },
            tile2: {
              selected: true,
            },
            tile3: {
              selected: false,
            },
          },
        },
        seg2: {
          selected: false,
          tiles: {
            tile4: {
              selected: false,
            },
          },
        },
      },
    };

    const expected: SectionSelection = {
      seg1: ['tile1', 'tile2'],
    };

    const selector = new GridSelector();
    const actual = selector.sectionCtxToSelection(ctx);

    expect(actual).toStrictEqual(expected);
  });

  it('should convert context to payload with no tile selected', () => {
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
          },
        },
        seg2: {
          selected: false,
          tiles: {
            tile4: {
              selected: false,
            },
          },
        },
      },
    };

    const selector = new GridSelector();

    const expected: SectionSelection = {};
    const actual = selector.sectionCtxToSelection(ctx);

    expect(actual).toStrictEqual(expected);
  });
});
