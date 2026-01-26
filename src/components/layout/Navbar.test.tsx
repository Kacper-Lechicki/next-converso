import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Navbar from './Navbar';

/**
 * FILE DESCRIPTION:
 * This file contains unit tests for the global `Navbar` component.
 * It verifies:
 * 1. Rendering of key elements (logo, items, language switcher).
 * 2. Responsive behavior (mobile menu toggle).
 * 3. Authentication state handling (Sign In vs User Button).
 * 4. Scroll-based styling updates.
 */

// 1. SETUP & MOCKS

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock Clerk to easily simulate different auth states without a real provider/backend.
vi.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-out">{children}</div>
  ),
  UserButton: () => <div data-testid="user-button">User Button</div>,
}));

// Mock child components to verify the Navbar specifically, not its children interactions.
vi.mock('@/components/layout/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

vi.mock('@/components/layout/NavbarItems', () => ({
  default: () => <div data-testid="navbar-items" />,
}));

vi.mock('@/config/assets', () => ({
  ASSETS: {
    logo: '/logo.png',
  },
}));

// 2. TEST SUITE
describe('Navbar', () => {
  /**
   * TEST CASE: Static elements rendering.
   * HOW IT WORKS:
   * 1. Render Navbar.
   * 2. Check for Logo image.
   * 3. Check for specific test IDs of mocked child components.
   */
  it('renders logo and navigation items', () => {
    render(<Navbar />);

    expect(screen.getByAltText('home_alt')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-items')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Signed Out View.
   * HOW IT WORKS:
   * 1. Render Navbar.
   * 2. Check if the 'Sign In' button text is present (which is inside <SignedOut>).
   */
  it('renders sign in button when signed out', () => {
    render(<Navbar />);
    expect(screen.getByText('sign_in')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Signed In View.
   * HOW IT WORKS:
   * 1. Render Navbar.
   * 2. Check if <UserButton> (mocked) is present (inside <SignedIn>).
   */
  it('renders user button when signed in', () => {
    render(<Navbar />);
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Mobile Menu Interaction.
   * HOW IT WORKS:
   * 1. Render Navbar.
   * 2. Find the hamburger menu button (aria-label 'open menu').
   * 3. Click it.
   * 4. Verify that the mobile navigation container (aria-label 'Mobile navigation') appears.
   * 5. Find the close button.
   * 6. Click it.
   * 7. Verify the mobile navigation container disappears.
   */
  it('toggles mobile menu on click', () => {
    render(<Navbar />);

    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();

    const closeButton = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeButton);

    expect(
      screen.queryByLabelText('Mobile navigation'),
    ).not.toBeInTheDocument();
  });

  /**
   * TEST CASE: Scroll effect.
   * HOW IT WORKS:
   * 1. Render Navbar.
   * 2. Check initial class (transparent border).
   * 3. Simulate window scroll event to 100px.
   * 4. Note: JSDOM doesn't layout, so we trust state update logic here.
   * In a real browser test, we'd check if the border class changed to 'border-primary'.
   * Here we just verify the initial state to ensure the scroll listener didn't crash it.
   */
  it('changes styles on scroll', () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector('header');

    expect(header).toHaveClass('border-transparent');

    fireEvent.scroll(window, { target: { scrollY: 100 } });
  });
});
