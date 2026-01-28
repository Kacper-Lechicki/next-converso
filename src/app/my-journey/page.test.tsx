import { getUserCompanions, getUserSessions } from '@/actions/companion';
import { currentUser } from '@clerk/nextjs/server';
import { render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import ProfilePage from './page';

// Mocks
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('@/actions/companion', () => ({
  getUserCompanions: vi.fn(),
  getUserSessions: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt || ''} />
  ),
}));

// Mock child components to simplify testing focus
vi.mock('@/components/feature/CompanionsList', () => ({
  default: ({
    title,
    companions,
  }: {
    title: string;
    companions: unknown[];
  }) => (
    <div data-testid="companions-list">
      {title} - Count: {companions?.length || 0}
    </div>
  ),
}));

// Mock UI components to avoid rendering complex shadcn/radix logic
vi.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion-item">{children}</div>
  ),
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion-trigger">{children}</div>
  ),
  AccordionContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion-content">{children}</div>
  ),
}));

describe('ProfilePage', () => {
  const mockUser = {
    id: 'user_123',
    firstName: 'John',
    lastName: 'Doe',
    emailAddresses: [{ emailAddress: 'john@example.com' }],
    imageUrl: '/avatar.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to /sign-in when user is not authenticated', async () => {
    (currentUser as Mock).mockResolvedValue(null);

    // Call component directly as function since it is an async server component
    try {
      await ProfilePage();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // ignore redirect throw if implementation throws
    }

    expect(redirect).toHaveBeenCalledWith('/sign-in');
  });

  it('renders user profile and stats correctly', async () => {
    (currentUser as Mock).mockResolvedValue(mockUser);

    const mockCompanions = [{ id: 'c1' }, { id: 'c2' }];
    const mockSessions = [{ id: 's1' }, { id: 's2' }, { id: 's3' }];

    (getUserCompanions as Mock).mockResolvedValue(mockCompanions);
    (getUserSessions as Mock).mockResolvedValue(mockSessions);

    const jsx = await ProfilePage();
    render(jsx);

    // Assert Profile Info
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('John')).toBeInTheDocument();

    // Assert Stats
    // Note: getTranslations mock returns the key provided
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('lessons_completed')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('companions_created')).toBeInTheDocument();
  });

  it('renders accordion sections with correct data', async () => {
    (currentUser as Mock).mockResolvedValue(mockUser);

    const mockCompanions = [{ id: 'c1' }];
    const mockSessions = [{ id: 's1' }];

    (getUserCompanions as Mock).mockResolvedValue(mockCompanions);
    (getUserSessions as Mock).mockResolvedValue(mockSessions);

    const jsx = await ProfilePage();
    render(jsx);

    // Assert Accordion Triggers
    expect(screen.getByText('recent_sessions')).toBeInTheDocument();

    // Check dynamic text in trigger: "my_companions (1)"
    // Since mock returns key 'my_companions', and code does: {t('my_companions')} {`(${companions.length})`}
    // It should render "my_companions (1)"
    expect(
      screen.getByText((content) => content.includes('my_companions (1)')),
    ).toBeInTheDocument();

    // Assert CompanionsList mocks usage
    // "recent_sessions - Count: 1"
    const lists = screen.getAllByTestId('companions-list');
    expect(lists).toHaveLength(2);

    expect(screen.getByText('recent_sessions - Count: 1')).toBeInTheDocument();
    expect(screen.getByText('my_companions - Count: 1')).toBeInTheDocument();
  });
});
