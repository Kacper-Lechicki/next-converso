import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ScrollToTop } from './ScrollToTop';

/**
 * FILE DESCRIPTION:
 * This file tests the `ScrollToTop` component.
 * It checks the logic that toggles visibility based on scroll position and the actual scroll method call.
 */

// 2. TEST SUITE
describe('ScrollToTop', () => {
  /**
   * TEST CASE: Initial visibility (Hidden).
   * HOW IT WORKS:
   * 1. Render component.
   * 2. Find button by aria-label.
   * 3. Check for 'invisible' class (since scrollY starts at 0).
   */
  it('is invisible initially', () => {
    render(<ScrollToTop />);

    const button = screen.getByLabelText('Scroll to top');

    expect(button).toHaveClass('invisible');
  });

  /**
   * TEST CASE: Visibility on scroll.
   * HOW IT WORKS:
   * 1. Render component.
   * 2. Trigger a window scroll event to 200px.
   * 3. Assert that the button now has the 'visible' class.
   */
  it('becomes visible after scrolling down', () => {
    render(<ScrollToTop />);

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 200 } });

    const button = screen.getByLabelText('Scroll to top');

    expect(button).toHaveClass('visible');
  });

  /**
   * TEST CASE: Click action.
   * HOW IT WORKS:
   * 1. Mock `window.scrollTo` to capture the call.
   * 2. Render component and scroll down to make it clickable (though click works even if invisible in DOM, good practice to match state).
   * 3. Click the button.
   * 4. Assert that `window.scrollTo` was called with `{ top: 0, behavior: 'smooth' }`.
   */
  it('scrolls window to top on click', () => {
    const scrollToMock = vi.fn();

    // Inject mock into window object
    window.scrollTo = scrollToMock;

    render(<ScrollToTop />);

    // Make visible first
    fireEvent.scroll(window, { target: { scrollY: 200 } });

    const button = screen.getByLabelText('Scroll to top');

    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
