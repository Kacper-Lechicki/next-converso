import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CompanionCard from './CompanionCard';

/**
 * FILE DESCRIPTION:
 * This file contains unit tests for the `CompanionCard` component.
 * It verifies that the card correctly displays companion details (name, topic, etc.)
 * and ensures the navigation link points to the correct destination.
 */

// 1. SETUP & MOCKS
// We need to mock `next-intl` to handle translations without loading actual locale files.
// Here we define a simple behavior: if the key is 'minutes', return 'min', otherwise return the key prefixed.
vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) =>
      key === 'minutes' ? 'min' : `CompanionCard.${key}`,
    ),
}));

// We mock `next/link` because we want to test that the anchor tag has the correct `href`.
// The real Next.js Link component is complex; a simple `<a>` tag suffices for testing attributes.
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="companion-link">
      {children}
    </a>
  ),
}));

// We mock the asset configuration to prevent import errors and provide stable paths for image checks.
vi.mock('@/config/assets', () => ({
  ASSETS: {
    icons: {
      bookmark: '/icons/bookmark.svg',
      clock: '/icons/clock.svg',
    },
  },
}));

vi.mock('@/components/feature/CompanionActions', () => ({
  default: () => <div data-testid="companion-actions" />,
}));

// 2. TEST SUITE
describe('CompanionCard', () => {
  // Define a mock companion object to be used across tests.
  // This isolates compliance with the `Companion` interface.
  const mockCompanion = {
    id: '123',
    name: 'Test Companion',
    topic: 'Test Topic',
    subject: 'Math',
    duration: 15,
    color: '#FF5733',
  };

  /**
   * TEST CASE: verifies that basic text content is rendered.
   * HOW IT WORKS:
   * 1. Renders the component with mock props.
   * 2. Uses `getByText` to find elements containing the name, topic, and subject.
   * 3. Assertions fail if text is not found.
   */
  it('renders companion name, topic, and subject', async () => {
    // Render the async component
    const component = await CompanionCard(mockCompanion);

    render(component);

    // Verify presence of core info
    expect(screen.getByText('Test Companion')).toBeInTheDocument();
    expect(screen.getByText('Test Topic')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument();
  });

  /**
   * TEST CASE: verifies duration formatting.
   * HOW IT WORKS:
   * 1. Renders the component.
   * 2. Checks if the duration number (15) is present in the document.
   * note: We mocked getTranslations to render "min", so we could also check for "15 min".
   */
  it('renders duration with translated label', async () => {
    const component = await CompanionCard(mockCompanion);

    render(component);

    expect(screen.getByText(/15/)).toBeInTheDocument();
  });

  /**
   * TEST CASE: verifies the navigation link.
   * HOW IT WORKS:
   * 1. Renders the component.
   * 2. Selects the access link using `data-testid="companion-link"` (setup in the mock).
   * 3. Checks if the `href` attribute matches the expected URL structure `/companions/{id}`.
   */
  it('renders a link pointing to the correct companion details page', async () => {
    const component = await CompanionCard(mockCompanion);

    render(component);

    const link = screen.getByTestId('companion-link');

    expect(link).toHaveAttribute('href', '/companions/123');
  });

  /**
   * TEST CASE: verifies dynamic styling.
   * HOW IT WORKS:
   * 1. Renders the component and gets the `container`.
   * 2. Finds the main `article` element.
   * 3. Checks if the `backgroundColor` style matches the one provided in props used for theming.
   */
  it('applies the correct background color style', async () => {
    const component = await CompanionCard(mockCompanion);
    const { container } = render(component);
    const article = container.querySelector('article');

    expect(article).toHaveStyle({ backgroundColor: '#FF5733' });
  });
});
