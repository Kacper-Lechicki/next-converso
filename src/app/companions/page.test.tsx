import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CompanionsLibraryPage from './page';

/**
 * FILE DESCRIPTION:
 * This file tests the Companions Library page (`/companions/page.tsx`).
 * It validates that the page:
 * 1. Reads search parameters (filters) from the URL.
 * 2. Fetches the appropriate data from the backend (`getAllCompanions` action).
 * 3. Renders the main structural components: search input, filter dropdown, and the results grid.
 */

// 1. SETUP & MOCKS

// Mock server-side translations.
vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) =>
      key === 'title' ? 'Companions Library' : key,
    ),
}));

// Mock the backend action.
// We assert that it returns a fixed list of 1 companion so we can verify rendering.
vi.mock('@/actions/companion', () => ({
  getAllCompanions: vi.fn().mockResolvedValue([
    {
      id: '550e8400-e29b-41d4-a716-446655440200',
      name: 'Test Companion',
      subject: 'maths',
      topic: 'Algebra',
      duration: 30,
      color: '#fff',
    },
  ]),
}));

// Mock child feature components.
vi.mock('@/components/feature/SearchInput', () => ({
  default: () => <div data-testid="search-input" />,
}));

vi.mock('@/components/feature/SubjectFilter', () => ({
  default: () => <div data-testid="subject-filter" />,
}));

vi.mock('@/components/feature/CompanionCard', () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="companion-card">{name}</div>
  ),
}));

// 2. TEST SUITE
describe('CompanionsLibraryPage', () => {
  /**
   * TEST CASE: Rendering UI elements.
   * HOW IT WORKS:
   * 1. Await page rendering (it's an async server component) with empty search params.
   * 2. Assert the title is compliant with translations.
   * 3. Assert all key interactive components (Filter, Search) are present.
   * 4. Assert that the "Test Companion" (mocked data) is displayed in a card.
   */
  it('renders correctly with companions', async () => {
    const searchParams = Promise.resolve({ subject: '', topic: '' });
    const component = await CompanionsLibraryPage({ searchParams });

    render(component);

    expect(screen.getByText('Companions Library')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('subject-filter')).toBeInTheDocument();
    expect(screen.getByTestId('companion-card')).toBeInTheDocument();
    expect(screen.getByText('Test Companion')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Data Fetching with Filters.
   * HOW IT WORKS:
   * 1. Define specific search params (subject='science', topic='physics').
   * 2. pass them to the Page component.
   * 3. Render the page.
   * 4. Spy on `getAllCompanions` and verify it was called with the exact same parameters we passed to the page.
   * This ensures the page acts as a correct "controller" passing URL state to the data layer.
   */
  it('passes filters to getAllCompanions', async () => {
    const getAllCompanionsMock = (await import('@/actions/companion'))
      .getAllCompanions;

    const searchParams = Promise.resolve({
      subject: 'science',
      topic: 'physics',
    });

    const component = await CompanionsLibraryPage({ searchParams });

    render(component);

    expect(getAllCompanionsMock).toHaveBeenCalledWith({
      subject: 'science',
      topic: 'physics',
    });
  });
});
