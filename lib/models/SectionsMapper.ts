import {
  createSegmentsMap,
  estimateSectionHeight,
  sectionFinalHeight,
  updateSectionsTop,
} from 'lib/helpers';
import type {
  GridConfig,
  SectionsMap,
  SectionType,
  SectionConfig,
} from 'lib/types';

export class SectionsMapper {
  private readonly gridConfig: GridConfig;

  private sectionsMap: SectionsMap;

  constructor(gridConfig: GridConfig) {
    this.gridConfig = gridConfig;
    this.sectionsMap = {};
  }

  createMap(sections: SectionType[]): SectionsMap {
    const map = sections.reduce<SectionsMap>(
      (map: SectionsMap, section: SectionType, index: number) => {
        const sectionHeight = estimateSectionHeight(
          section.totalImages,
          this.gridConfig
        );
        return {
          ...map,
          [section.sectionId]: {
            height: sectionHeight,
            top: this.gridConfig.sectionMargin + map['prev'].height,
            visible: false,
            index,
            segmentsMap: {},
          },
          prev: {
            ...map.prev,
            height:
              sectionHeight +
              this.gridConfig.sectionMargin +
              map['prev'].height,
          },
        } as SectionsMap;
      },
      {
        prev: { height: 0, top: 0, visible: false, index: -1, segmentsMap: {} },
      }
    );

    delete map['prev'];

    this.sectionsMap = map;

    return { ...this.sectionsMap };
  }

  getMap(): SectionsMap {
    return { ...this.sectionsMap };
  }

  getSectionConfig(sectionId: string): SectionConfig {
    return { ...this.sectionsMap[sectionId] };
  }

  updateForSection(section: SectionType, isVisible: boolean): SectionConfig {
    const oldSectionMap: SectionConfig = this.sectionsMap[section.sectionId];

    if (!isVisible) {
      oldSectionMap.visible = false;
      return oldSectionMap;
    }

    const newSectionMap: SectionConfig = this.recomputeSectionMap(section);

    newSectionMap.visible = isVisible;
    this.sectionsMap[section.sectionId] = newSectionMap;

    return newSectionMap;
  }

  updateSectionsTopFrom(
    sectionPos: number,
    delta: number,
    sections: SectionType[]
  ): SectionsMap {
    const nextToBeSectionsId: string[] = sections
      .slice(sectionPos)
      .map((section: SectionType) => section.sectionId);

    this.sectionsMap = {
      ...this.sectionsMap,
      ...updateSectionsTop(this.sectionsMap, nextToBeSectionsId, delta),
    };

    return { ...this.sectionsMap };
  }

  recomputeSectionMap(section: SectionType): SectionConfig {
    const sectionMap: SectionConfig = this.sectionsMap[section.sectionId];
    const segmentsMap = createSegmentsMap(section.segments, this.gridConfig);
    const height = sectionFinalHeight(segmentsMap, this.gridConfig);

    return {
      ...sectionMap,
      segmentsMap,
      height,
    };
  }
}
