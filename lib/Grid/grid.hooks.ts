import type { GridConfigType } from 'lib/types';
import {
  useCallback,
  useEffect,
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
