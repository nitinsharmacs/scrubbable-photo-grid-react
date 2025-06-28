import Grid from 'lib/Grid/grid';
import './App.css';
import { createRef, useState } from 'react';
import type { GridConfigType, SectionType } from 'lib/types';

import store from '../data/populated.json';

const loadedSections = store.slice(0, 10) as SectionType[];

const gridConfig: GridConfigType = {
  containerWidth: 900,
  segmentMargin: 5,
  sectionMargin: 10,
  targetRowHeight: 150,
};

function App() {
  const [config, setConfig] = useState<GridConfigType>(gridConfig);

  const [sections, updateSections] = useState<SectionType[]>(loadedSections);

  const parentRef = createRef<HTMLDivElement>();

  return (
    <div ref={parentRef}>
      <Grid config={config} gridData={sections} parent={parentRef} />
    </div>
  );
}

export default App;
