import type { SectionProps } from 'lib/components/Section/types';

import './section.css';
import type { SegmentType } from 'lib/types';
import Segment from 'lib/components/Segment/Segment';
import { createSectionContext } from 'lib/helpers';
import { useSectionContext } from './section.hooks';
import { useEffect } from 'react';

const Section = ({ section, config, map, onSelect }: SectionProps) => {
  const [ctx, handlers] = useSectionContext(createSectionContext(section));

  // TODO: remove this way of using hook, to handling onSelect.
  useEffect(() => {
    onSelect && onSelect(section.sectionId, ctx);
  }, [ctx]);

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
                ctx={ctx.segments[segment.segmentId]}
                onSelect={handlers.selectHandler}
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
