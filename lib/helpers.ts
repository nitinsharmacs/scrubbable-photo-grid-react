import type { GridConfig, SectionType, SectionsMap } from 'lib/types';

const IMAGE_ASPECT_RATIO: number = 3 / 2;
const COALESCING_FACTOR: number = 7 / 10;

export const estimateSectionHeight = (
  totalImages: number,
  config: GridConfig
): number => {
  const unwrappedWidth =
    IMAGE_ASPECT_RATIO *
    totalImages *
    config.targetRowHeight *
    COALESCING_FACTOR;
  const rows = Math.ceil(unwrappedWidth / config.containerWidth);
  return rows * config.targetRowHeight;
};

export const initSectionsMap = (
  sections: SectionType[],
  gridConfig: GridConfig
) => {
  return sections.reduce<SectionsMap>(
    (map: SectionsMap, section: SectionType, index: number) => {
      const sectionHeight = estimateSectionHeight(
        section.totalImages,
        gridConfig
      );
      return {
        ...map,
        [section.sectionId]: {
          height: sectionHeight,
          top: gridConfig.sectionMargin + map['prev'].height,
          visible: false,
          index,
        },
        prev: {
          ...map.prev,
          height: sectionHeight + gridConfig.sectionMargin + map['prev'].height,
        },
      } as SectionsMap;
    },
    { prev: { height: 0, top: 0, visible: false } }
  );
};
