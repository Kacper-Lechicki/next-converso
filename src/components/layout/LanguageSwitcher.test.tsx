import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * FILE DESCRIPTION:
 * This file tests the `LanguageSwitcher` component.
 * It verifies that the language dropdown renders options and that clicking an option
 * triggers the server action to switch locale.
 */

// 1. SETUP & MOCKS

const mockSetLocale = vi.fn();
const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

// Mock auth/i18n config
vi.mock('@/i18n/config', () => ({
  locales: ['en', 'pl'],
  localeCreate: { en: 'English', pl: 'Polski' },
}));

// Mock the server action for locale switching.
vi.mock('@/actions/locale', () => ({
  setLocale: (locale: string) => mockSetLocale(locale),
}));

// Mock Radix UI Dropdown to simplify interaction testing.
// Instead of dealing with portals and triggers, we render a simple button list.
vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

// 2. TEST SUITE
describe('LanguageSwitcher', () => {
  /**
   * TEST CASE: Options rendering.
   * HOW IT WORKS:
   * 1. Render the switcher.
   * 2. Verify that English and Polski are present as options (text).
   */
  it('renders language options', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Polski')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Locale switching logic.
   * HOW IT WORKS:
   * 1. Render switcher.
   * 2. Find the 'Polski' button.
   * 3. Click it.
   * 4. Assert that `setLocale` mock was called with 'pl'.
   * This confirms the component correctly communicates with the backend action.
   */
  it('calls setLocale when a new language is selected', () => {
    render(<LanguageSwitcher />);

    const plOption = screen.getByText('Polski');
    fireEvent.click(plOption);

    expect(mockSetLocale).toHaveBeenCalledWith('pl');
  });
});
