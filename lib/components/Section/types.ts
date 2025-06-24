import type { GridConfigType, SectionConfigType, SectionType } from 'lib/types';

export interface SectionProps {
  section: SectionType;
  config: GridConfigType;
  map: SectionConfigType;
}
