import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SubjectBadge from './SubjectBadge';

/**
 * FILE DESCRIPTION:
 * This file tests the `SubjectBadge` component.
 * It ensures the component visually represents a subject by rendering the correct icon
 * and applying the correct subject-specific color theme.
 */

// 1. SETUP & MOCKS

// Mock assets to provide specific paths for testing assertions.
vi.mock('@/config/assets', () => ({
  ASSETS: {
    subjects: {
      maths: '/icons/maths.svg',
      science: '/icons/science.svg',
    },
  },
}));

// Mock utils to isolate color logic.
// We define a simple map: maths -> red, others -> blue.
vi.mock('@/lib/utils', () => ({
  cn: (...inputs: string[]) => inputs.join(' '),
  getSubjectColor: (subject: string) =>
    subject === 'maths' ? '#ff0000' : '#0000ff',
}));

// 2. TEST SUITE
describe('SubjectBadge', () => {
  /**
   * TEST CASE: Icon rendering.
   * HOW IT WORKS:
   * 1. Render the badge for 'maths'.
   * 2. Find the image by its alt text ('maths').
   * 3. Verify it is in the document and has the correct src attribute as defined in our mock.
   */
  it('renders correctly with given subject', () => {
    render(<SubjectBadge subject="maths" size={35} />);

    const img = screen.getByAltText('maths');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/icons/maths.svg');
  });

  /**
   * TEST CASE: Color styling.
   * HOW IT WORKS:
   * 1. Render the badge for 'maths'.
   * 2. Get the root container div.
   * 3. Check if the inline style `backgroundColor` matches our mocked utility output ('#ff0000').
   */
  it('applies the correct background color via inline style', () => {
    const { container } = render(<SubjectBadge subject="maths" size={35} />);
    const div = container.firstChild;

    expect(div).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  /**
   * TEST CASE: Custom class names.
   * HOW IT WORKS:
   * 1. Render the badge with an extra class 'p-4'.
   * 2. Verify that the rendered element includes this class, ensuring flexibility/reusability.
   */
  it('applies custom class names', () => {
    const { container } = render(
      <SubjectBadge subject="science" size={35} classNames="p-4" />,
    );

    const div = container.firstChild;

    expect(div).toHaveClass('p-4');
  });
});
