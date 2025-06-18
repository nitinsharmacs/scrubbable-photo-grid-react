import type { GridConfig, SectionConfig, SectionType } from 'lib/types';

export interface SectionProps {
  section: SectionType;
  config: GridConfig;
  map: SectionConfig;
}
