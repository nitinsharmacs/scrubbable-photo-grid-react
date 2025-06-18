import { useState } from 'react';
import './grid.css';

import store from '../data/store.json';
import type { SectionsMap, GridConfig, SectionType } from 'lib/types';
import { initSectionsMap } from 'lib/helpers';
import Section from 'lib/components/Section/Section';

const gridConfig: GridConfig = {
  containerWidth: 800,
  segmentMargin: 10,
  sectionMargin: 20,
  targetRowHeight: 150,
};

const loadedSections = store.slice(0, 10);

const Grid = () => {
  const [config, setConfig] = useState<GridConfig>(gridConfig);
  const [sections, updateSections] = useState(loadedSections);

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
