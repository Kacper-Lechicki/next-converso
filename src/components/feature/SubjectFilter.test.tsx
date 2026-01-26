import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SubjectFilter from './SubjectFilter';

/**
 * FILE DESCRIPTION:
 * This file tests the `SubjectFilter` component.
 * It verifies that the user can select a subject from a dropdown and that this action
 * correctly updates the URL parameters to filter the displayed content.
 */

// 1. SETUP & MOCKS

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

// Mock navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/companions',
  useSearchParams: () => mockSearchParams,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock the app config to control what subjects are available in the test.
vi.mock('@/config/app', () => ({
  SUBJECTS: ['maths', 'science', 'coding'],
}));

// Mock the UI `Select` component (typically from shadcn/ui).
// Why? Radix primitives are complex and depend on PointerEvents/Context that can be hard to simulate in JSDOM.
// By mocking them as a standard HTML <select>, we can easily test the *logic* (props, value changes) without wrestling with UI library internals.
vi.mock('@/components/ui/select', () => ({
  Select: ({
    onValueChange,
    children,
  }: {
    onValueChange: (val: string) => void;
    children: React.ReactNode;
  }) => (
    <div data-testid="select">
      {/* Hidden select for logic testing */}
      <select
        onChange={(e) => onValueChange(e.target.value)}
        style={{ display: 'none' }}
      >
        <option value="all">All</option>
        <option value="maths">Maths</option>
        <option value="science">Science</option>
        <option value="coding">Coding</option>
      </select>
      {/* Visual children rendered outside */}
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ placeholder }: { placeholder: string }) => (
    <span>{placeholder}</span>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  SelectItem: ({
    value,
    children,
  }: {
    value: string;
    children: React.ReactNode;
  }) => <option value={value}>{children}</option>,
}));

// 2. TEST SUITE
describe('SubjectFilter', () => {
  /**
   * TEST CASE: Initial rendering.
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Verify the custom mock select exists.
   * 3. Verify placeholder text is present.
   */
  it('renders the select filter', () => {
    render(<SubjectFilter />);
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByText('placeholder')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Options rendering.
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Verify that our mocked subjects (maths, science) and the 'all_subjects' option are rendered as text.
   */
  it('renders all subjects as options', () => {
    render(<SubjectFilter />);
    expect(screen.getByText('all_subjects')).toBeInTheDocument();
    expect(screen.getByText('maths')).toBeInTheDocument();
    expect(screen.getByText('science')).toBeInTheDocument();
  });

  /**
   * TEST CASE: Selection logic (Filtering).
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Find the `<select>` element (rendered by our mock).
   * 3. Simulate a change event where the user selects 'science'.
   * 4. Assert that `router.push` is called with URL `.../companions?subject=science`.
   */
  it('updates URL when a subject is selected', () => {
    render(<SubjectFilter />);

    // We find the hidden select to trigger change
    // Since it's display:none, getByRole('combobox') might fail.
    // Let's rely on standard DOM query inside the test id or just relax the display:none for test.
    // Or just render it visible for test.
    const select = screen.getByTestId('select').querySelector('select')!;
    fireEvent.change(select, { target: { value: 'science' } });

    expect(mockPush).toHaveBeenCalledWith(
      '/companions?subject=science',
      expect.objectContaining({ scroll: false }),
    );
  });

  /**
   * TEST CASE: Clearing filter.
   * HOW IT WORKS:
   * 1. Render the component.
   * 2. Simulate selecting 'all'.
   * 3. Assert that `router.push` is called without the subject parameter, effectively clearing the filter.
   */
  it('removes subject parameter when "all" is selected', () => {
    render(<SubjectFilter />);

    const select = screen.getByTestId('select').querySelector('select')!;
    fireEvent.change(select, { target: { value: 'all' } });

    expect(mockPush).toHaveBeenCalledWith(
      '/companions?',
      expect.objectContaining({ scroll: false }),
    );
  });
});
