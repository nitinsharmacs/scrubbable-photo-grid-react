import type { SectionCtx, SectionProps } from 'lib/components/Section/types';

import './section.css';
import type { SegmentType } from 'lib/types';
import Segment from 'lib/components/Segment/Segment';
import { useCallback, useState } from 'react';
import { createSectionContext } from 'lib/helpers';

const Section = ({ section, config, map }: SectionProps) => {
  const [ctx, updateCtx] = useState<SectionCtx>(createSectionContext(section));
  const selectHandler = useCallback(({ segmentId, tileId }) => {
    updateCtx((prevCtx) => {
      return {
        ...prevCtx,
        segments: {
          ...prevCtx.segments,
          [segmentId]: {
            ...prevCtx.segments[segmentId],
            tiles: {
              ...prevCtx.segments[segmentId].tiles,
              [tileId]: {
                selected: !prevCtx.segments[segmentId].tiles[tileId].selected,
              },
            },
          },
        },
      };
    });
  }, []);

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
                onSelect={selectHandler}
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
