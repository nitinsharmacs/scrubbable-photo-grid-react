import type {
  SectionCtx,
  SectionSelectionHandler,
} from 'lib/components/Section/types';
import type { GridSelectionHandler } from 'lib/Grid/types';
import GridSelector from 'lib/models/GridSelector';
import type { GridConfigType } from 'lib/types';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';

export const useGridConfig = (
  config: GridConfigType,
  parent: RefObject<HTMLElement | null> | undefined
): GridConfigType => {
  const [gridConfig, updateGridConfig] = useState<GridConfigType>(config);
  const resizeRequested = useRef<boolean>(false);
  const resizeTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const resizeHandler = useCallback(() => {
    if (!resizeRequested.current) {
      resizeRequested.current = true;
      requestAnimationFrame(() => {
        resizeRequested.current = false;

        clearTimeout(resizeTimeout.current);

        resizeTimeout.current = setTimeout(() => {
          updateGridConfig((prev) => ({
            ...prev,
            containerWidth: parent?.current?.clientWidth || prev.containerWidth,
          }));
        }, 30);
      });
    }
  }, []);

  useEffect(() => {
    if (!parent) {
      return;
    }

    updateGridConfig((prev) => ({
      ...prev,
      containerWidth: parent.current?.clientWidth || prev.containerWidth,
    }));

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return gridConfig;
};

export const useGridSelector = (
  sideEffect: GridSelectionHandler | undefined
): SectionSelectionHandler => {
  const gridSelector = useMemo<GridSelector>(() => new GridSelector(), []);

  const selectHandler = useCallback((sectionId: string, ctx: SectionCtx) => {
    gridSelector.update(sectionId, ctx);
    sideEffect && sideEffect(gridSelector.selections);
  }, []);

  return selectHandler;
};
