import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import Grid from 'lib/Grid/Grid';
import { GridConfigType } from 'lib/types';

import sections from '../../data/sections.json';

import { SectionsMapper } from 'lib/models/SectionsMapper';
import userEvent from '@testing-library/user-event';

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

  it('should resize on window resize', async () => {
    const observeMock = vi.fn();
    mockIntersectionObserver({ observe: observeMock });

    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', {
      configurable: true,
      get: () => 800,
    });

    render(
      <Grid config={gridConfig} gridData={sections} parent={{ current: div }} />
    );

    expect(screen.getByText('April, 2019').closest('.section')).toHaveStyle(
      'width: 800px'
    );

    Object.defineProperty(div, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(screen.getByText('April, 2019').closest('.section')).toHaveStyle(
        'width: 500px'
      );
    });
  });

  it('should select segment', async () => {
    mockIntersectionObserver();

    const onSelectMock = vi.fn();

    render(
      <Grid config={gridConfig} gridData={sections} onSelect={onSelectMock} />
    );

    const firstSegment = screen.getAllByLabelText('segment-checkicon')[0];
    await userEvent.click(firstSegment);

    expect(onSelectMock).toHaveBeenNthCalledWith(3, {
      '2019_04': {
        '2019_04_25': [
          'f350c526-6e91-417c-a4dd-5b776b52592a',
          'e34f3222-1113-4f7e-9bf1-1d09fefaa0f6',
        ],
      },
    });
  });
});
