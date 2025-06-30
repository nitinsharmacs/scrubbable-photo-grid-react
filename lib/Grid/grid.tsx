import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import './grid.css';

import Section from 'lib/components/Section/Section';
import type {
  SectionConfigType,
  SectionsMapType,
  SectionType,
} from 'lib/types';
import type { GridProps } from 'lib/Grid/types';
import { useGridConfig } from 'lib/Grid/grid.hooks';
import { SectionsMapper } from 'lib/models/SectionsMapper';

const Grid = ({ config, gridData, parent }: GridProps) => {
  const gridRef = createRef<HTMLDivElement>();

  const gridConfig = useGridConfig(config, parent);

  const sectionsMapper = useMemo(
    () => new SectionsMapper(gridConfig),
    [gridConfig]
  );

  const [sectionsMap, updateSectionsMap] = useState<SectionsMapType>(
    sectionsMapper.createMap.bind(sectionsMapper, gridData)
  );

  const intersectionHandler: IntersectionObserverCallback = useCallback(
    (sectionsEntry: IntersectionObserverEntry[]) => {
      sectionsEntry.forEach((sectionEntry: IntersectionObserverEntry) => {
        const oldSectionMap: SectionConfigType =
          sectionsMapper.getSectionConfig(sectionEntry.target.id);

        const section: SectionType = gridData[oldSectionMap.index];

        const newSectionMap: SectionConfigType =
          sectionsMapper.updateForSection(section, sectionEntry.isIntersecting);

        sectionsMapper.updateSectionsTopFrom(
          oldSectionMap.index + 1,
          newSectionMap.height - oldSectionMap.height,
          gridData
        );
      });

      updateSectionsMap(sectionsMapper.getMap());
    },
    [sectionsMapper]
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

    return () => {
      sectionObserver.disconnect();
    };
  }, [intersectionHandler]);

  useEffect(() => {
    updateSectionsMap(sectionsMapper.createMap(gridData));
  }, [sectionsMapper]);

  return (
    <div className='grid' ref={gridRef}>
      {gridData.map((section: SectionType) => (
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
