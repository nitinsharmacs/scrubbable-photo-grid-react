import type { GridSelections } from 'lib/models/GridSelector';
import type { GridConfigType, SectionType } from 'lib/types';
import type { RefObject } from 'react';

export type GridSelectionHandler = (selections: GridSelections) => void;
export interface GridProps {
  gridData: SectionType[];
  config: GridConfigType;
  parent?: RefObject<HTMLElement | null>;
  onSelect?: GridSelectionHandler;
}
