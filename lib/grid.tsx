import { createRef, useCallback, useEffect, useState } from 'react';
import './grid.css';

import Section from 'lib/components/Section/Section';
import {
  initSectionsMap,
  recomputeSectionMap,
  updateSectionsTop,
} from 'lib/helpers';
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

  const [sectionsMap, updateSectionsMap] = useState<SectionsMap>(
    initSectionsMap(loadedSections, config)
  );

  const intersectionHandler: IntersectionObserverCallback = useCallback(
    (sectionsEntry: IntersectionObserverEntry[]) => {
      /**
       * recompute section map for each entry
       * update tops of next section based on recompute
       *  */

      updateSectionsMap((prevSectionsMap: SectionsMap) => {
        return sectionsEntry.reduce<SectionsMap>(
          (map, entry: IntersectionObserverEntry) => {
            const oldSectionMap: SectionConfig = map[entry.target.id];

            const sectionMap: SectionConfig = recomputeSectionMap(
              map[entry.target.id],
              sections[oldSectionMap.index],
              gridConfig
            );

            sectionMap.visible = entry.isIntersecting;

            const nextToBeSectionsId: string[] = sections
              .slice(oldSectionMap.index + 1)
              .map((section: SectionType) => section.sectionId);

            const delta: number = sectionMap.height - oldSectionMap.height;

            map[entry.target.id] = sectionMap;

            return updateSectionsTop(map, nextToBeSectionsId, delta);
          },
          prevSectionsMap
        );
      });
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
