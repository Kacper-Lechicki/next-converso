import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

/**
 * FILE DESCRIPTION:
 * This file contains unit tests for the `CompanionForm` component.
 * It primarily checks for the presence and accessibility of all form fields required
 * to create a new companion (Name, Subject, Topic, Voice, Style, Duration).
 */

// 1. SETUP & MOCKS

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

// Mock the server action used for submission
vi.mock('@/actions/companion', () => ({
  createCompanion: vi.fn(),
}));

vi.mock('@/hooks/use-server-action', () => ({
  useServerAction: () => ({
    run: vi.fn(),
    isPending: false,
  }),
}));

// We provide real translation messages here instead of a generic mock function.
// This is because the form uses `NextIntlClientProvider` in our test setup wrapping,
// allowing us to test real label visibility.
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

// Helper function to render the component within the IntL provider context.
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
};

// 2. TEST SUITE
describe('CompanionForm', () => {
  /**
   * TEST CASE: Form element presence.
   * HOW IT WORKS:
   * 1. Import component dynamically (simulating async loading if needed, though standard import works too).
   * 2. Render with providers.
   * 3. Use `container.querySelector` to ensure a standard <form> tag is output.
   */
  it('renders the form', async () => {
    const { default: CompanionForm } =
      await import('@/components/feature/CompanionForm');

    const { container } = renderWithProviders(<CompanionForm />);

    expect(container.querySelector('form')).toBeInTheDocument();
  });

  /**
   * TEST CAES: Individual Fields.
   * HOW THEY WORK:
   * Each test below focuses on a specific input type:
   * 1. Renders the form.
   * 2. Uses `getByPlaceholderText` or `getByText` (label approximation) to find the control.
   * 3. Asserts it is present (`toBeInTheDocument`).
   */

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

    // Looks for a button with the specific accessible name (text).
    // The match is case-insensitive (/i).
    expect(
      screen.getByRole('button', { name: /build your companion/i }),
    ).toBeInTheDocument();
  });
});
