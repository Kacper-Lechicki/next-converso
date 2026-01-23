import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

describe('SignInPage', () => {
  it('renders without crashing', async () => {
    const { default: SignInPage } =
      await import('@/app/sign-in/[[...sign-in]]/page');

    render(<SignInPage />);

    expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument();
  });

  it('renders Clerk SignIn component inside a centered container', async () => {
    const { default: SignInPage } =
      await import('@/app/sign-in/[[...sign-in]]/page');

    const { container } = render(<SignInPage />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('wraps SignIn with full width container', async () => {
    const { default: SignInPage } =
      await import('@/app/sign-in/[[...sign-in]]/page');

    const { container } = render(<SignInPage />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('w-full');
  });
});
