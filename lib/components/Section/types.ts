import type { SegmentCtx } from 'lib/components/Segment/types';
import type { GridConfigType, SectionConfigType, SectionType } from 'lib/types';

export interface SectionProps {
  section: SectionType;
  config: GridConfigType;
  map: SectionConfigType;
}

export type SectionCtx = {
  selected: boolean;
  segments: {
    [key: string]: SegmentCtx;
  };
};
