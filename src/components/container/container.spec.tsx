import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './contrainer';

describe('Container component suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders children correctly', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>,
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(
      <Container className='custom-class'>
        <span>Content</span>
      </Container>,
    );
    const container = screen.getByText('Content').parentElement;
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('custom-class');
  });
});
