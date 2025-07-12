import type { GridSelections } from 'lib/models/GridSelector';
import type { GridConfigType, SectionType } from 'lib/types';
import type { RefObject } from 'react';

export type GridSelectionHandler = (selections: GridSelections) => void;
export interface GridProps {
  gridData: SectionType[];
  config: GridConfigType;
  ref?: React.Ref<GridOps> | undefined;
  parent?: RefObject<HTMLElement | null>;
  onSelect?: GridSelectionHandler;
}

export interface GridOps {
  resetSelection: () => void;
}
