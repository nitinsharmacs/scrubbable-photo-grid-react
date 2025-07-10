import type { SegmentCtx } from 'lib/components/Segment/types';
import type { GridConfigType, SectionConfigType, SectionType } from 'lib/types';

export type SectionSelectionHandler = (
  sectionId: string,
  ctx: SectionCtx
) => void;

export interface SectionProps {
  section: SectionType;
  config: GridConfigType;
  map: SectionConfigType;
  onSelect?: SectionSelectionHandler;
}

export type SectionCtx = {
  selected: boolean;
  segments: {
    [key: string]: SegmentCtx;
  };
};
