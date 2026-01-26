import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CompanionComponent from './CompanionComponent';

/**
 * FILE DESCRIPTION:
 * This file tests the `CompanionComponent`, which is the core interactive element for the AI session.
 * It integrates with the Vapi SDK for voice, displays Lottie animations, and handles real-time transcripts.
 * The tests focus on ensuring the UI updates correctly in response to these external events.
 */

// 1. SETUP & MOCKS

// We create mock functions (spies) for the Vapi instance methods.
// We use vi.hoisted to ensure these variables are initialized before the mock is applied
// because vi.mock is hoisted to the top of the file.
const { mockStart, mockStop, mockSetMuted, mockOn, mockOff } = vi.hoisted(
  () => ({
    mockStart: vi.fn(),
    mockStop: vi.fn(),
    mockSetMuted: vi.fn(),
    mockOn: vi.fn(),
    mockOff: vi.fn(),
  }),
);

// Mock the Vapi SDK module.
vi.mock('@vapi-ai/web', () => {
  return {
    default: class {
      start = mockStart;
      stop = mockStop;
      setMuted = mockSetMuted;
      on = mockOn;
      off = mockOff;
    },
  };
});

// Mock Lottie for animations.
// Lottie is canvas/SVG based and heavy; for testing we just need to know it rendered.
vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-animation" />,
}));

// Mock Clerk user data.
// The component displays the user's name and image, so we provide fake data here.
vi.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: {
      fullName: 'Test User',
      imageUrl: '/test-user.jpg',
    },
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/utils', () => ({
  cn: (...inputs: string[]) => inputs.join(' '),
  getSubjectColor: () => '#ffffff',
}));

vi.mock('@/config/assets', () => ({
  ASSETS: {
    icons: {
      mic_on: '/mic-on.svg',
      mic_off: '/mic-off.svg',
    },
  },
}));

vi.mock('@/config/env', () => ({
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: 'https://clerk.test',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test',
    NEXT_PUBLIC_SUPABASE_URL: 'https://supabase.test',
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: 'sb_test',
    NEXT_PUBLIC_VAPI_WEB_TOKEN: 'vapi_test',
  },
}));

// 2. TEST SUITE
describe('CompanionComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Default props to reuse in tests
  const defaultProps = {
    id: '1',
    name: 'AI Companion',
    subject: 'coding',
    topic: 'React',
    voice: 'male',
    style: 'casual',
    duration: 15,
    color: '#ffffff',
    userName: 'Test User',
    userImage: '/test-user.jpg',
  };

  /**
   * TEST CASE: Initial UI State.
   * HOW IT WORKS:
   * 1. Render the component with default props.
   * 2. Check if the companion name ('AI Companion') is visible.
   * 3. Check if the authenticated user's name ('Test User') is visible.
   * 4. Verify the 'Start Session' button is present (since session hasn't started).
   * 5. Verify the transcript placeholder text is shown.
   */
  it('renders initial state correctly', () => {
    render(<CompanionComponent {...defaultProps} />);

    expect(screen.getByText('AI Companion')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'start_session' }),
    ).toBeInTheDocument();
    expect(screen.getByText('transcript_placeholder')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Starting a session.
   * HOW IT WORKS:
   * 1. Render component.
   * 2. Find the start button.
   * 3. Click the button (`fireEvent.click`).
   * 4. Assert that `vapi.start()` (our mock) was called.
   * This confirms the button is wired to the SDK correctly.
   */
  it('handles start session click', async () => {
    const { waitFor } = await import('@testing-library/react');
    render(<CompanionComponent {...defaultProps} />);

    const startButton = screen.getByRole('button', { name: 'start_session' });
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(mockStart).toHaveBeenCalled();
    });
  });

  /**
   * TEST CASE: Event Listeners Registration.
   * HOW IT WORKS:
   * 1. Render component.
   * 2. Assert that `vapi.on()` was called for specific events ('call-start', 'message').
   * This ensures the component subscribes to necessary updates (like receiving a transcript) immediately on mount.
   */
  it('calls vapi event listeners on mount', () => {
    render(<CompanionComponent {...defaultProps} />);
    expect(mockOn).toHaveBeenCalledWith('call-start', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('message', expect.any(Function));
  });

  /**
   * TEST CASE: Cleanup.
   * HOW IT WORKS:
   * 1. Render component.
   * 2. Unmount component (`unmount()`).
   * 3. Assert that `vapi.off()` was called.
   * This is critical to prevent memory leaks or zombie event listeners in a SPA.
   */
  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<CompanionComponent {...defaultProps} />);
    unmount();

    expect(mockOff).toHaveBeenCalledWith('call-start', expect.any(Function));
  });
});
