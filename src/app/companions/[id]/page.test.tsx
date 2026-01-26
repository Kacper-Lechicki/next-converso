import { render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import CompanionSessionPage from './page';

/**
 * FILE DESCRIPTION:
 * This file tests the Companion Session page (`/companions/[id]/page.tsx`).
 * It verifies the server-side logic:
 * 1. Authentication Check: Redirects to login if no user.
 * 2. Data Fetching: Fetches companion by ID.
 * 3. Validation: Redirects to 404/list if companion is invalid.
 * 4. Success State: Renders the core `CompanionComponent`.
 */

// 1. SETUP & MOCKS

// Mock data fetching action.
vi.mock('@/actions/companion', () => ({
  getCompanion: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) => (key === 'minutes' ? 'min' : key)),
}));

// Mock Clerk user fetching.
vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
  User: {},
}));

const mockRedirect: Mock<(url: string) => never> = vi.fn(() => {
  throw new Error('NEXT_REDIRECT');
});

// Mock redirect to verify routing logic.
vi.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
}));

// Mock children.
vi.mock('@/components/feature/CompanionComponent', () => ({
  default: () => <div data-testid="companion-component" />,
}));

vi.mock('@/components/feature/SubjectBadge', () => ({
  default: () => <div data-testid="subject-badge" />,
}));

vi.mock('@/config/assets', () => ({
  ASSETS: {
    icons: { clock: '/clock.svg' },
  },
}));

// 2. TEST SUITE
describe('CompanionSessionPage', () => {
  /**
   * TEST CASE: Unauthenticated User.
   * HOW IT WORKS:
   * 1. Mock `currentUser` to return null.
   * 2. Call the page component.
   * 3. Assert `redirect` was called with `/sign-in`.
   */
  it('redirects to sign-in if user is not authenticated', async () => {
    const { currentUser } = await import('@clerk/nextjs/server');

    vi.mocked(currentUser).mockResolvedValue(null);

    try {
      await CompanionSessionPage({ params: Promise.resolve({ id: '1' }) });
    } catch (e) {
      if ((e as Error).message !== 'NEXT_REDIRECT') throw e;
    }

    expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
  });

  /**
   * TEST CASE: Invalid Companion ID.
   * HOW IT WORKS:
   * 1. Mock `currentUser` to return a valid user.
   * 2. Mock `getCompanion` to return null (not found).
   * 3. Call the page.
   * 4. Assert `redirect` was called with `/companions` (fallback list).
   */
  it('redirects to companions list if companion not found', async () => {
    const { currentUser } = await import('@clerk/nextjs/server');

    vi.mocked(currentUser).mockResolvedValue({
      firstName: 'Test',
      imageUrl: '/img.png',
    } as Awaited<ReturnType<typeof currentUser>>);

    const { getCompanion } = await import('@/actions/companion');
    vi.mocked(getCompanion).mockResolvedValue(null);

    try {
      await CompanionSessionPage({ params: Promise.resolve({ id: '1' }) });
    } catch (e) {
      if ((e as Error).message !== 'NEXT_REDIRECT') throw e;
    }

    expect(mockRedirect).toHaveBeenCalledWith('/companions');
  });

  /**
   * TEST CASE: Successful Render.
   * HOW IT WORKS:
   * 1. Mock valid User.
   * 2. Mock valid Companion Data.
   * 3. Render the page.
   * 4. Assert that companion details (name, subject) are visible.
   * 5. Assert that the `CompanionComponent` (the voice/interactive part) is initialized.
   */
  it('renders companion details and component if found', async () => {
    const { currentUser } = await import('@clerk/nextjs/server');

    vi.mocked(currentUser).mockResolvedValue({
      firstName: 'Test',
      imageUrl: '/img.png',
    } as Awaited<ReturnType<typeof currentUser>>);

    const { getCompanion } = await import('@/actions/companion');

    vi.mocked(getCompanion).mockResolvedValue({
      id: '1',
      name: 'My Buddy',
      subject: 'coding',
      topic: 'React',
      duration: 20,
      color: '#fff',
    });

    const component = await CompanionSessionPage({
      params: Promise.resolve({ id: '1' }),
    });

    render(component);

    expect(screen.getByText('My Buddy')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText(/20/)).toBeInTheDocument();
    expect(screen.getByTestId('companion-component')).toBeInTheDocument();
  });
});
