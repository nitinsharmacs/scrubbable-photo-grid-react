import type { SectionCtx } from 'lib/components/Section/types';

export type SectionSelection = { [segment: string]: string[] };

export type GridSelections = {
  [section: string]: SectionSelection;
};

export default class GridSelector {
  private _selections: GridSelections;
  constructor() {
    this._selections = {};
  }

  update(sectionId: string, ctx: SectionCtx): void {
    const payload = this.sectionCtxToSelection(ctx);
    if (Object.keys(payload).length > 0) this._selections[sectionId] = payload;
    else delete this._selections[sectionId];
  }

  sectionCtxToSelection(ctx: SectionCtx): SectionSelection {
    return Object.keys(ctx.segments).reduce<{ [key: string]: string[] }>(
      (acc, segmentId) => {
        const tilesCtx = ctx.segments[segmentId].tiles;
        const selectedTiles = Object.keys(tilesCtx).filter(
          (tileid) => tilesCtx[tileid].selected
        );

        if (selectedTiles.length > 0) {
          acc[segmentId] = selectedTiles;
        }
        return acc;
      },
      {}
    );
  }
  get selections(): GridSelections {
    return { ...this._selections };
  }
}
