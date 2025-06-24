import type {
  GridConfigType,
  SegmentConfigType,
  SegmentsMapType,
} from 'lib/types';

export class SectionMap {
  private gridConfig: GridConfigType;
  private segmentsMap: SegmentsMapType;

  constructor(gridConfig: GridConfigType, segmentsMap: SegmentsMapType) {
    this.gridConfig = gridConfig;
    this.segmentsMap = segmentsMap;
  }

  get height(): number {
    return Object.values(this.segmentsMap).reduce<number>(
      (height: number, segmentConfig: SegmentConfigType) => {
        return this.gridConfig.segmentMargin + segmentConfig.height + height;
      },
      0
    );
  }
}
