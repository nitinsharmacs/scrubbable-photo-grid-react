import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import Grid from 'lib/Grid/Grid';
import { GridConfigType } from 'lib/types';

import sections from '../../data/sections.json';

import { SectionsMapper } from 'lib/models/SectionsMapper';

vi.mock('lib/models/SectionsMapper', () => {
  const SectionsMapperMock = vi.fn();
  SectionsMapperMock.prototype.createMap = vi.fn();
  SectionsMapperMock.prototype.getMap = vi.fn();
  SectionsMapperMock.prototype.getSectionConfig = vi.fn();
  SectionsMapperMock.prototype.updateForSection = vi.fn();
  SectionsMapperMock.prototype.updateSectionsTop = vi.fn();
  SectionsMapperMock.prototype.updateSectionsTopFrom = vi.fn();
  SectionsMapperMock.prototype.recomputeSectionMap = vi.fn();

  return {
    SectionsMapper: SectionsMapperMock,
  };
});

const mockIntersectionObserver = (
  behaviorOverrides = {},
  cb = (_: any) => {}
) => {
  const behavior = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    ...behaviorOverrides,
  };

  const IntersectionObserverMock = vi.fn().mockImplementation((handler) => {
    cb(handler);
    return behavior;
  });
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

  return behavior;
};

describe('Grid', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const gridConfig: GridConfigType = {
    containerWidth: 800,
    segmentMargin: 10,
    sectionMargin: 20,
    targetRowHeight: 150,
  };

  let mapper;
  beforeEach(() => {
    mapper = new SectionsMapper(gridConfig);
    vi.mocked(mapper.createMap).mockReturnValue({
      '2019_04': {
        height: 380,
        top: 20,
        visible: true,
        index: 0,
        segmentsMap: {
          '2019_04_25': { top: 10, height: 10, width: 10, tiles: [] },
          '2019_04_24': { top: 10, height: 10, width: 10, tiles: [] },
        },
      },
      '2018_12': {
        height: 150,
        top: 440,
        visible: false,
        index: 1,
        segmentsMap: {},
      },
    });
  });

  it('should match snapshot', () => {
    const observerMock = mockIntersectionObserver();

    const { container } = render(
      <Grid config={gridConfig} gridData={sections} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should observe sections', () => {
    const observeMock = vi.fn();
    const observerMock = mockIntersectionObserver({ observe: observeMock });

    render(<Grid config={gridConfig} gridData={sections} />);

    expect(observeMock).toBeCalledTimes(2);
  });

  it('should update section on intersection', () => {
    const observerMock = mockIntersectionObserver({}, (handler) => {
      handler([{ target: { id: 'someid' }, isIntersecting: true }]);
    });

    vi.mocked(mapper.getSectionConfig).mockReturnValue({
      height: 310,
      top: 20,
      visible: false,
      index: 0,
      segmentsMap: {},
    });
    vi.mocked(mapper.updateForSection).mockReturnValue({
      height: 380,
      top: 20,
      visible: true,
      index: 0,
      segmentsMap: {
        '2019_04_25': { top: 10, height: 10, width: 10, tiles: [] },
        '2019_04_24': { top: 10, height: 10, width: 10, tiles: [] },
      },
    });

    render(<Grid config={gridConfig} gridData={sections} />);

    expect(mapper.getSectionConfig).toBeCalledWith('someid');
    expect(mapper.updateForSection).toBeCalledWith(sections[0], true);
    expect(mapper.updateSectionsTopFrom).toBeCalledWith(1, 70, sections);
  });
});
