import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { CheckButtonProps } from 'lib/components/CheckButton/types';

import './checkbutton.css';

const CheckButton = (props: CheckButtonProps) => {
  return (
    <div
      className={['checkbutton', props.active ? 'active' : ''].join(' ')}
      data-tile-id={props.id}
      aria-label={props.label}
      style={{
        position: props.position || 'static',
      }}
      onClick={props.onClick}
    >
      <CheckCircleIcon />
    </div>
  );
};

export default CheckButton;
