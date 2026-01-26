import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProfilePage from './page';

/**
 * FILE DESCRIPTION:
 * This file tests the My Journey (Profile) page.
 * Currently, this page acts as a placeholder or dashboard root.
 * The test ensures it renders a recognizable element to confirm routing works.
 */

// 2. TEST SUITE
describe('ProfilePage', () => {
  /**
   * TEST CASE: Placeholder Rendering.
   * HOW IT WORKS:
   * 1. Render Page.
   * 2. Check for text 'ProfilePage'.
   */
  it('renders the profile page placeholder', () => {
    render(<ProfilePage />);
    expect(screen.getByText('ProfilePage')).toBeInTheDocument();
  });
});
