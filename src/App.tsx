import Grid from 'lib/Grid/Grid';
import './App.css';
import { useRef, useState } from 'react';
import type { GridConfigType, SectionType } from 'lib/types';

import store from '../data/populated.json';
import type { GridOps } from 'lib/Grid/types';

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

  const parentRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<GridOps>(null);

  return (
    <>
      <button
        onClick={() => {
          gridRef.current?.resetSelection();
        }}
      >
        Reset
      </button>
      <div ref={parentRef}>
        <Grid
          ref={gridRef}
          config={config}
          gridData={sections}
          parent={parentRef}
          onSelect={console.log}
        />
      </div>
    </>
  );
}

export default App;
