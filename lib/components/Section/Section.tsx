import type { SectionProps } from 'lib/components/Section/types';

import './section.css';

const Section = ({ section, config, map }: SectionProps) => {
  return (
    <div
      className='section'
      id={section.sectionId}
      style={{
        width: `${config.containerWidth}px`,
        height: `${map.height}px`,
        top: `${map.top}px`,
      }}
    ></div>
  );
};

export default Section;
