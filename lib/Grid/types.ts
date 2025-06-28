import type { GridConfigType, SectionType } from 'lib/types';
import type { RefObject } from 'react';

export interface GridProps {
  gridData: SectionType[];
  config: GridConfigType;
  parent?: RefObject<HTMLElement | null>;
}
