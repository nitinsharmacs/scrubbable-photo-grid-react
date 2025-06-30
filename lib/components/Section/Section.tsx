import type { SectionProps } from 'lib/components/Section/types';

import './section.css';
import type { SegmentType } from 'lib/types';
import Segment from 'lib/components/Segment/Segment';

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
    >
      {map.visible ? (
        <>
          <div className='section-header' style={{ height: map.headerHeight }}>
            <h2>{section.header}</h2>
          </div>
          <div className='section-content'>
            {section.segments.map((segment: SegmentType) => (
              <Segment
                key={segment.segmentId}
                segment={segment}
                map={map.segmentsMap[segment.segmentId]}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Section;
