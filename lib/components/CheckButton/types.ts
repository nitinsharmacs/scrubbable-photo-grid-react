import type { CSSProperties } from 'react';

export interface CheckButtonProps {
  active?: boolean;
  label: string;
  id: string;
  styles?: CSSProperties;
  onClick?: (e: React.SyntheticEvent) => void;
}
