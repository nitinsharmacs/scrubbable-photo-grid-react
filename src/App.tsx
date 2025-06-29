import { Grid } from '../';

import './App.css';
import { createRef, useState } from 'react';

import store from '../data/populated.json';

const loadedSections = store.slice(0, 10);

const gridConfig = {
  containerWidth: 900,
  segmentMargin: 5,
  sectionMargin: 10,
  targetRowHeight: 150,
};

function App() {
  const [config, setConfig] = useState(gridConfig);

  const [sections, updateSections] = useState(loadedSections);

  const parentRef = createRef<HTMLDivElement>();

  return (
    <div ref={parentRef}>
      <Grid config={config} gridData={sections} parent={parentRef} />
    </div>
  );
}

export default App;
