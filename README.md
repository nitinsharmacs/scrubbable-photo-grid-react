# Scrubbable Photo Grid

This is a scrubbable photo grid react component that can be used in your image viewer applications.

## Installation

1. Clone the github repo.

```
git clone https://github.com/nitinsharmacs/scrubbable-photo-grid-react.git
```

2. Install the dependencies.

```
npm install
```

3. View the demo.

```
npm run dev
```

4. Building the dist

```
npm run build
```

## Usage

Once build, grid component can be imported in your application as shown below.

```javascript
import { Grid } from 'scrubbable-photo-grid';
import type {
  GridConfigType,
  SectionType,
} from 'scrubbable-photo-grid/dist/types';

import { createRef } from 'react';

import images from 'images.json';

const gridData = images.slice(0, 10) as SectionType[];

const gridConfig: GridConfigType = {
  containerWidth: 900,
  targetRowHeight: 150,
  segmentMargin: 5,
  sectionMargin: 10,
};

const Photos = () => {
  const ref = createRef<HTMLDivElement>();

  return (
    <div className='photos' ref={ref}>
      <Grid gridData={gridData} config={gridConfig} parent={ref} />
    </div>
  );
};

export default Photos;
```

You can find the structure of `images.json` from the test data at path `tests/data/`.

## Notice

This is in an active development, so please expect the bugs.

## Resources

1. https://medium.com/google-design/google-photos-45b714dfbed1
