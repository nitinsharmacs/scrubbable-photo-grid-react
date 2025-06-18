import { useState } from 'react';
import './grid.css';

import Section from 'lib/components/Section/Section';
import { initSectionsMap } from 'lib/helpers';
import type { GridConfig, SectionsMap, SectionType } from 'lib/types';
import store from '../data/store.json';

const gridConfig: GridConfig = {
  containerWidth: 800,
  segmentMargin: 10,
  sectionMargin: 20,
  targetRowHeight: 150,
};

const loadedSections = store.slice(0, 5) as SectionType[];

const Grid = () => {
  const [config, setConfig] = useState<GridConfig>(gridConfig);
  const [sections, updateSections] = useState<SectionType[]>(loadedSections);

  const [sectionsMap, updateSectionsMap] = useState<SectionsMap>(
    initSectionsMap(loadedSections, config)
  );

  return (
    <div className='grid'>
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
