import type { GridConfigType } from 'lib/types';
import { useEffect, useState, type RefObject } from 'react';

export const useGridConfig = (
  config: GridConfigType,
  parent: RefObject<HTMLElement | null> | undefined
): GridConfigType => {
  const [gridConfig, updateGridConfig] = useState<GridConfigType>(config);

  useEffect(() => {
    if (parent) {
      updateGridConfig((prev) => ({
        ...prev,
        containerWidth: parent.current?.clientWidth || prev.containerWidth,
      }));

      window.addEventListener('resize', () => {
        updateGridConfig((prev) => ({
          ...prev,
          containerWidth: parent.current?.clientWidth || prev.containerWidth,
        }));
      });
    }
  }, []);

  return gridConfig;
};
