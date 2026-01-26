import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SearchInput from './SearchInput';

/**
 * FILE DESCRIPTION:
 * This file tests the `SearchInput` component.
 * It focuses on user input handling, specifically "debouncing" (waiting for the user to stop typing)
 * and updating the URL query parameters to filter results.
 */

// 1. SETUP & MOCKS

// We create a spy for `router.push` to verify navigation without moving valid pages.
const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

import { useRouter } from 'next/navigation';

// Mock Next.js navigation hooks
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return {
    ...actual,
    useRouter: vi.fn(),
    usePathname: () => '/companions', // Simulate being on the companions page
    useSearchParams: () => mockSearchParams,
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/config/assets', () => ({
  ASSETS: {
    icons: {
      search: '/icons/search.svg',
    },
  },
}));

// 2. TEST SUITE
describe('SearchInput', () => {
  vi.mocked(useRouter).mockReturnValue({
    push: mockPush,
  } as unknown as ReturnType<typeof useRouter>);

  beforeEach(() => {
    vi.clearAllMocks();
  });
  /**
   * TEST CASE: Initial rendering.
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Verify the input field exists with the expected placeholder.
   */
  it('renders the input with placeholder', () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Debounced Search logic.
   * HOW IT WORKS:
   * 1. Enable invalid/fake timers (`vi.useFakeTimers()`). This allows us to control time flow.
   * 2. Render the component.
   * 3. Simulate typing 'test topic' into the input.
   * 4. Assert that `router.push` has NOT been called yet (because of debounce delay).
   * 5. Fast-forward time by 500ms (the debounce duration).
   * 6. Assert that `router.push` IS called now with `?topic=test+topic`.
   * 7. Restore real timers.
   */
  it('debounces input and updates query params', async () => {
    vi.useFakeTimers();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('placeholder');
    // Simulate user typing
    fireEvent.change(input, { target: { value: 'test topic' } });

    // Should not call immediately
    expect(mockPush).not.toHaveBeenCalled();

    // Fast forward time to trigger the setTimeout callback
    vi.advanceTimersByTime(500);

    // Verify navigation was triggered with correct query params
    expect(mockPush).toHaveBeenCalledWith(
      '/companions?topic=test+topic',
      expect.objectContaining({ scroll: false }),
    );

    // Cleanup
    vi.useRealTimers();
  });

  /**
   * TEST CASE: Clearing input.
   * HOW IT WORKS:
   * 1. Enable fake timers.
   * 2. Render component.
   * 3. Simulate clearing the text input (value = '').
   * 4. Advance time.
   * 5. Assert that `router.push` is called with the topic parameter removed.
   */
  it('removes topic parameter when input is cleared', async () => {
    vi.useFakeTimers();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('placeholder');

    // Simulate user typing something first to ensure we have a state to clear from
    fireEvent.change(input, { target: { value: 'abc' } });
    vi.advanceTimersByTime(500);
    expect(mockPush).toHaveBeenLastCalledWith(
      '/companions?topic=abc',
      expect.objectContaining({ scroll: false }),
    );

    // Now clear it
    fireEvent.change(input, { target: { value: '' } });

    // Fast forward
    vi.advanceTimersByTime(500);

    // Verify navigation with empty/removed params
    expect(mockPush).toHaveBeenLastCalledWith(
      '/companions?',
      expect.objectContaining({ scroll: false }),
    );

    vi.useRealTimers();
  });
});
