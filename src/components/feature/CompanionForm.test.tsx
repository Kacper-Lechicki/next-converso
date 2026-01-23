import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('@/actions/companion', () => ({
  createCompanion: vi.fn(),
}));

vi.mock('@/hooks/use-server-action', () => ({
  useServerAction: () => ({
    run: vi.fn(),
    isPending: false,
  }),
}));

const messages = {
  CompanionForm: {
    companion_name: 'Companion Name',
    enter_companion_name: 'Enter companion name',
    subject: 'Subject',
    select_subject: 'Select subject',
    what_to_help_with: 'What to help with',
    help_example: 'Help example',
    voice: 'Voice',
    select_voice: 'Select voice',
    male: 'Male',
    female: 'Female',
    style: 'Style',
    select_style: 'Select style',
    formal: 'Formal',
    casual: 'Casual',
    estimated_duration: 'Estimated duration',
    build_your_companion: 'Build Your Companion',
  },
  Success: {
    saved: 'Saved successfully',
  },
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
};

describe('CompanionForm', () => {
  it('renders the form', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    const { container } = renderWithProviders(<CompanionForm />);

    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders name input field', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(
      screen.getByPlaceholderText('Enter companion name'),
    ).toBeInTheDocument();
  });

  it('renders subject select field', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(screen.getByText('Subject')).toBeInTheDocument();
  });

  it('renders topic textarea', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(screen.getByText('What to help with')).toBeInTheDocument();
  });

  it('renders voice select field', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(screen.getByText('Voice')).toBeInTheDocument();
  });

  it('renders style select field', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(screen.getByText('Style')).toBeInTheDocument();
  });

  it('renders duration input', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(screen.getByText('Estimated duration')).toBeInTheDocument();
  });

  it('renders submit button', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    renderWithProviders(<CompanionForm />);

    expect(
      screen.getByRole('button', { name: /build your companion/i }),
    ).toBeInTheDocument();
  });
});
