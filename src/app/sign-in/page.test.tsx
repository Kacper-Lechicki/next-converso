import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

/**
 * FILE DESCRIPTION:
 * This file tests the Sign In page (`/sign-in/[[...sign-in]]/page.tsx`).
 * It verifies the proper integration of the Clerk `<SignIn />` component and ensuring
 * the layout container is correctly centered for a good user experience.
 */

// 1. SETUP & MOCKS

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Mock Clerk SignIn.
// We capture potential appearance props via data attributes to verify detailed config if needed.
vi.mock('@clerk/nextjs', () => ({
  SignIn: ({ appearance }: { appearance?: object }) => (
    <div
      data-testid="clerk-sign-in"
      data-appearance={JSON.stringify(appearance)}
    >
      Clerk SignIn Component
    </div>
  ),
}));

// 2. TEST SUITE
describe('SignInPage', () => {
  /**
   * TEST CASE: Component Integration.
   * HOW IT WORKS:
   * 1. Import the dynamic route page.
   * 2. Render it.
   * 3. Confirm the mock `clerk-sign-in` element is present.
   */
  it('renders without crashing', async () => {
    const { default: SignInPage } =
      await import('@/app/sign-in/[[...sign-in]]/page');

    render(<SignInPage />);

    expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Layout (Flex Centering).
   * HOW IT WORKS:
   * 1. Render the page.
   * 2. Get the first child (wrapper).
   * 3. Assert it has standard tailwind flex centering classes (`flex`, `items-center`, `justify-center`).
   */
  it('renders Clerk SignIn component inside a centered container', async () => {
    const { default: SignInPage } =
      await import('@/app/sign-in/[[...sign-in]]/page');

    const { container } = render(<SignInPage />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center');
  });

  /**
   * TEST CASE: Layout (Width).
   * HOW IT WORKS:
   * 1. Render the page.
   * 2. Assert wrapper has `w-full`. This ensures responsiveness.
   */
  it('wraps SignIn with full width container', async () => {
    const { default: SignInPage } =
      await import('@/app/sign-in/[[...sign-in]]/page');

    const { container } = render(<SignInPage />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('w-full');
  });
});
