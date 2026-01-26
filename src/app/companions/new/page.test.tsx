import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NewCompanionPage from './page';

/**
 * FILE DESCRIPTION:
 * This file tests the New Companion page (`/companions/new/page.tsx`).
 * It ensures that the page is protected (requires auth) and renders the
 * `CompanionForm` for content creation.
 */

// 1. SETUP & MOCKS

const mockRedirect = vi.fn();

vi.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
  useRouter: () => ({
    back: vi.fn(),
  }),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) =>
      key === 'companion_builder' ? 'Builder' : key,
    ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock Clerk auth.
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

// Mock the form component.
vi.mock('@/components/feature/CompanionForm', () => ({
  default: () => <form data-testid="companion-form" />,
}));

// 2. TEST SUITE
describe('NewCompanionPage', () => {
  /**
   * TEST CASE: Auth Protection.
   * HOW IT WORKS:
   * 1. Mock `auth()` to return null userId.
   * 2. Call the page function.
   * 3. Assert `redirect` to '/sign-in'.
   */
  it('redirects to sign-in if not authenticated', async () => {
    const { auth } = await import('@clerk/nextjs/server');

    vi.mocked(auth).mockResolvedValue({ userId: null } as Awaited<
      ReturnType<typeof auth>
    >);

    await NewCompanionPage();

    expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
  });

  /**
   * TEST CASE: Successful Render.
   * HOW IT WORKS:
   * 1. Mock valid userId.
   * 2. Render the page.
   * 3. Check for the page title ('Builder').
   * 4. Check for the form component test ID.
   */
  it('renders the form if authenticated', async () => {
    const { auth } = await import('@clerk/nextjs/server');

    vi.mocked(auth).mockResolvedValue({ userId: 'user-123' } as Awaited<
      ReturnType<typeof auth>
    >);

    const component = await NewCompanionPage();

    render(component);

    expect(screen.getByText('Builder')).toBeInTheDocument();
    expect(screen.getByTestId('companion-form')).toBeInTheDocument();
  });
});
