import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Grid from 'lib/grid';
import React from 'react';

describe('App', () => {
  it('should render App', () => {
    render(<Grid />);
    expect(screen.getByText('Grid')).toBeInTheDocument();
  });
});
