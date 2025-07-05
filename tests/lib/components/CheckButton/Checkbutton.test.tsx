import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckButton from 'lib/components/CheckButton/CheckButton';
import { describe, expect, it } from 'vitest';

describe('CheckButton', () => {
  it('should match snapshot', () => {
    const { container } = render(<CheckButton id='btn-id' label='tile-btn' />);
    expect(container).toMatchSnapshot();
  });

  it('should check checkbutton', () => {
    render(<CheckButton id='btn-id' label='tile-btn' active />);

    expect(screen.getByLabelText('tile-btn')).toHaveAttribute(
      'class',
      'checkbutton active'
    );
  });
});
