import type {
  SectionCtx,
  SectionSelectionHandler,
} from 'lib/components/Section/types';
import type { GridOps, GridSelectionHandler } from 'lib/Grid/types';
import GridSelector from 'lib/models/GridSelector';
import type { GridConfigType } from 'lib/types';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
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
  gridRef: React.Ref<GridOps> | undefined,
  sideEffect: GridSelectionHandler | undefined
): { isReset: boolean; selectHandler: SectionSelectionHandler } => {
  const [isReset, reset] = useState<boolean>(false);

  const gridSelector = useMemo<GridSelector>(() => new GridSelector(), []);

  const selectHandler = useCallback((sectionId: string, ctx: SectionCtx) => {
    gridSelector.update(sectionId, ctx);
    sideEffect && sideEffect(gridSelector.selections);
  }, []);

  useImperativeHandle(
    gridRef,
    () => {
      return {
        resetSelection() {
          reset((prev) => !prev);
        },
      };
    },
    []
  );
  return { isReset, selectHandler };
};
