import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NavbarItems from './NavbarItems';

/**
 * FILE DESCRIPTION:
 * This file tests the `NavbarItems` component.
 * It ensures that the component iterates over the navigation config to map links
 * and correctly highlights the active link based on the current URL.
 */

// 1. SETUP & MOCKS

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock specific nav items for predictable testing.
vi.mock('@/config/navigation', () => ({
  NAV_ITEMS: [
    { href: '/', labelKey: 'home' },
    { href: '/about', labelKey: 'about' },
  ],
}));

// Mock current path to be root ('/'), so 'home' should be active.
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// 2. TEST SUITE
describe('NavbarItems', () => {
  /**
   * TEST CASE: Link rendering.
   * HOW IT WORKS:
   * 1. Render component.
   * 2. Verify that both 'Navbar.home' and 'Navbar.about' keys are rendered.
   */
  it('renders navigation links', () => {
    render(<NavbarItems />);

    expect(screen.getByText('Navbar.home')).toBeInTheDocument();
    expect(screen.getByText('Navbar.about')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Active State.
   * HOW IT WORKS:
   * 1. We know `usePathname` is mocked to `/`.
   * 2. We verify that the HOME link has the accessible attribute `aria-current="page"` and the active styling class.
   * 3. We verify that the ABOUT link does NOT have this attribute.
   */
  it('applies active style to the current path', () => {
    render(<NavbarItems />);

    const homeLink = screen.getByText('Navbar.home');
    const aboutLink = screen.getByText('Navbar.about');

    expect(homeLink).toHaveAttribute('aria-current', 'page');
    expect(homeLink).toHaveClass('text-primary');

    expect(aboutLink).not.toHaveAttribute('aria-current');
  });
});
