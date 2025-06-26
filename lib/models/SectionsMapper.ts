import { createSegmentsMap, estimateSectionHeight } from 'lib/helpers';
import { SectionMap } from 'lib/models/SectionMap';
import type {
  GridConfigType,
  SectionsMapType,
  SectionType,
  SectionConfigType,
} from 'lib/types';

export class SectionsMapper {
  private readonly gridConfig: GridConfigType;

  private sectionsMap: SectionsMapType;

  constructor(gridConfig: GridConfigType) {
    this.gridConfig = gridConfig;
    this.sectionsMap = {};
  }

  createMap(sections: SectionType[]): SectionsMapType {
    const map = sections.reduce<SectionsMapType>(
      (map: SectionsMapType, section: SectionType, index: number) => {
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
              this.gridConfig.sectionMargin * 2 +
              map['prev'].height,
          },
        } as SectionsMapType;
      },
      {
        prev: { height: 0, top: 0, visible: false, index: -1, segmentsMap: {} },
      }
    );

    delete map['prev'];

    this.sectionsMap = map;

    return { ...this.sectionsMap };
  }

  getMap(): SectionsMapType {
    return { ...this.sectionsMap };
  }

  getSectionConfig(sectionId: string): SectionConfigType {
    return { ...this.sectionsMap[sectionId] };
  }

  updateForSection(
    section: SectionType,
    isVisible: boolean
  ): SectionConfigType {
    const oldSectionMap: SectionConfigType =
      this.sectionsMap[section.sectionId];

    if (!isVisible) {
      oldSectionMap.visible = false;
      return oldSectionMap;
    }

    const newSectionMap: SectionConfigType = this.recomputeSectionMap(section);

    newSectionMap.visible = isVisible;
    this.sectionsMap[section.sectionId] = newSectionMap;

    return newSectionMap;
  }

  private updateSectionsTop(
    toBeUpdatedSectionsId: string[],
    delta: number
  ): SectionsMapType {
    return toBeUpdatedSectionsId.reduce<SectionsMapType>(
      (map, sectionId: string) => {
        return {
          ...map,
          [sectionId]: { ...map[sectionId], top: map[sectionId].top + delta },
        };
      },
      {
        ...this.sectionsMap,
      }
    );
  }

  updateSectionsTopFrom(
    sectionPos: number,
    delta: number,
    sections: SectionType[]
  ): SectionsMapType {
    const nextToBeSectionsId: string[] = sections
      .slice(sectionPos)
      .map((section: SectionType) => section.sectionId);

    this.sectionsMap = {
      ...this.sectionsMap,
      ...this.updateSectionsTop(nextToBeSectionsId, delta),
    };

    return { ...this.sectionsMap };
  }

  recomputeSectionMap(section: SectionType): SectionConfigType {
    const sectionMap: SectionConfigType = this.sectionsMap[section.sectionId];
    const segmentsMap = createSegmentsMap(section.segments, this.gridConfig);

    const sectionMapper = new SectionMap(this.gridConfig, segmentsMap);

    return {
      ...sectionMap,
      segmentsMap: segmentsMap,
      height: sectionMapper.height,
    };
  }
}
