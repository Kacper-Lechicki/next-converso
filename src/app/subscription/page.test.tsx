import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SubscriptionPage from './page';

/**
 * FILE DESCRIPTION:
 * This file tests the Subscription page.
 * It verifies that the Clerk `PricingTable` component is being used.
 * This ensures the monetization UI is accessible.
 */

// 1. MOCKS
vi.mock('@clerk/nextjs', () => ({
  PricingTable: () => <div data-testid="pricing-table">Pricing Table</div>,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// 2. TEST SUITE
describe('SubscriptionPage', () => {
  /**
   * TEST CASE: Pricing Table Rendering.
   * HOW IT WORKS:
   * 1. Render page.
   * 2. Assert the mocked `pricing-table` ID is found.
   */
  it('renders the pricing table', () => {
    render(<SubscriptionPage />);
    expect(screen.getByTestId('pricing-table')).toBeInTheDocument();
  });
});
