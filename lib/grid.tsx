import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import './grid.css';

import Section from 'lib/components/Section/Section';
import { SectionsMapper } from './models/SectionsMapper';
import type {
  GridConfig,
  SectionConfig,
  SectionsMap,
  SectionType,
} from 'lib/types';
import store from '../data/store.json';

const gridConfig: GridConfig = {
  containerWidth: 800,
  segmentMargin: 10,
  sectionMargin: 20,
  targetRowHeight: 150,
};

const loadedSections = store.slice(0, 5) as SectionType[];

const Grid = () => {
  const gridRef = createRef<HTMLDivElement>();

  const [config, setConfig] = useState<GridConfig>(gridConfig);

  const [sections, updateSections] = useState<SectionType[]>(loadedSections);

  const sectionsMapper = useMemo(() => new SectionsMapper(config), [config]);

  const [sectionsMap, updateSectionsMap] = useState<SectionsMap>(
    sectionsMapper.createMap.bind(sectionsMapper, sections)
  );

  const intersectionHandler: IntersectionObserverCallback = useCallback(
    (sectionsEntry: IntersectionObserverEntry[]) => {
      sectionsEntry.forEach((sectionEntry: IntersectionObserverEntry) => {
        const oldSectionMap: SectionConfig = sectionsMapper.getSectionConfig(
          sectionEntry.target.id
        );

        const section: SectionType = sections[oldSectionMap.index];

        const newSectionMap: SectionConfig = sectionsMapper.updateForSection(
          section,
          sectionEntry.isIntersecting
        );

        sectionsMapper.updateSectionsTopFrom(
          oldSectionMap.index + 1,
          newSectionMap.height - oldSectionMap.height,
          sections
        );
      });

      updateSectionsMap(sectionsMapper.getMap());
    },
    []
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px 0px',
    };
    const sectionObserver: IntersectionObserver = new IntersectionObserver(
      intersectionHandler,
      options
    );
    gridRef.current
      ?.querySelectorAll('.section')
      .forEach(sectionObserver.observe.bind(sectionObserver));
  }, []);

  return (
    <div className='grid' ref={gridRef}>
      {sections.map((section: SectionType) => (
        <Section
          key={section.sectionId}
          section={section}
          config={gridConfig}
          map={sectionsMap[section.sectionId]}
        />
      ))}
    </div>
  );
};

export default Grid;
