import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CTA from './CTA';

/**
 * FILE DESCRIPTION:
 * This file tests the `CTA` (Call to Action) component.
 * It verifies the main promotional section contains the correct titles, descriptions, images, and links.
 */

// 1. SETUP & MOCKS

// Mock translations to verify specific keys are requested.
vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) =>
      key === 'build_new_companion' ? 'Build New' : key,
    ),
}));

// Mock Link to verify the href and allow easy selection via testid.
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="cta-link">
      {children}
    </a>
  ),
}));

// Mock assets configurations.
vi.mock('@/config/assets', () => ({
  ASSETS: {
    images: {
      cta: '/images/cta.png',
    },
    icons: {
      plus: '/icons/plus.svg',
    },
  },
}));

// 2. TEST SUITE
describe('CTA', () => {
  /**
   * TEST CASE: Text content rendering.
   * HOW IT WORKS:
   * 1. Await the server component rendering.
   * 2. Assert that the main heading (h2) is present.
   * 3. Assert that translation keys 'start_learning' and 'description' are rendered as text.
   */
  it('renders CTA heading and description', async () => {
    const component = await CTA();
    render(component);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('start_learning')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Action link verification.
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Find the link by test ID.
   * 3. Check if it points to `/companions/new` (the builder page).
   * 4. Check if the text matches the mocked translation ('Build New').
   */
  it('renders the build new companion link', async () => {
    const component = await CTA();
    render(component);

    const link = screen.getByTestId('cta-link');
    expect(link).toHaveAttribute('href', '/companions/new');
    expect(screen.getByText('Build New')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Image rendering.
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Look for the image by its alt text key ('cta_alt').
   * 3. Assert it is in the document.
   */
  it('renders the main CTA image', async () => {
    const component = await CTA();
    render(component);

    const img = screen.getByAltText('cta_alt');
    expect(img).toBeInTheDocument();
  });
});
