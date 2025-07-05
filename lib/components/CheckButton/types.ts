export interface CheckButtonProps {
  active?: boolean;
  label: string;
  id: string;
  position?: 'absolute' | 'static';
  onClick?: (e: React.SyntheticEvent) => void;
}
