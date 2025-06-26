import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import './grid.css';

import Section from 'lib/components/Section/Section';
import { SectionsMapper } from './models/SectionsMapper';
import type {
  GridConfigType,
  SectionConfigType,
  SectionsMapType,
  SectionType,
} from 'lib/types';
import store from '../data/populated.json';

const gridConfig: GridConfigType = {
  containerWidth: 900,
  segmentMargin: 10,
  sectionMargin: 20,
  targetRowHeight: 150,
};

const loadedSections = store.slice(0, 10) as SectionType[];

const Grid = () => {
  const gridRef = createRef<HTMLDivElement>();

  const [config, setConfig] = useState<GridConfigType>(gridConfig);

  const [sections, updateSections] = useState<SectionType[]>(loadedSections);

  const sectionsMapper = useMemo(() => new SectionsMapper(config), [config]);

  const [sectionsMap, updateSectionsMap] = useState<SectionsMapType>(
    sectionsMapper.createMap.bind(sectionsMapper, sections)
  );

  const intersectionHandler: IntersectionObserverCallback = useCallback(
    (sectionsEntry: IntersectionObserverEntry[]) => {
      sectionsEntry.forEach((sectionEntry: IntersectionObserverEntry) => {
        const oldSectionMap: SectionConfigType =
          sectionsMapper.getSectionConfig(sectionEntry.target.id);

        const section: SectionType = sections[oldSectionMap.index];

        const newSectionMap: SectionConfigType =
          sectionsMapper.updateForSection(section, sectionEntry.isIntersecting);

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
