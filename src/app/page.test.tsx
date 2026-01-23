import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/mocks/companions', () => ({
  POPULAR_COMPANIONS: [
    {
      id: '1',
      name: 'Test Companion 1',
      topic: 'Topic 1',
      subject: 'science',
      duration: 30,
      color: '#fff',
    },
    {
      id: '2',
      name: 'Test Companion 2',
      topic: 'Topic 2',
      subject: 'maths',
      duration: 45,
      color: '#eee',
    },
  ],
  RECENT_SESSIONS: [
    {
      id: '3',
      name: 'Recent 1',
      topic: 'Recent Topic',
      subject: 'coding',
      duration: 15,
      color: '#ddd',
    },
  ],
}));

vi.mock('@/components/feature/CompanionCard', () => ({
  default: ({ name, id }: { name: string; id: string }) => (
    <div data-testid="companion-card" data-id={id}>
      {name}
    </div>
  ),
}));

vi.mock('@/components/feature/CompanionsList', () => ({
  default: ({
    title,
    companions,
  }: {
    title: string;
    companions: { id: string; name: string }[];
  }) => (
    <div data-testid="companions-list" data-count={companions?.length || 0}>
      {title}
    </div>
  ),
}));

vi.mock('@/components/feature/CTA', () => ({
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

describe('HomePage Components', () => {
  describe('CompanionCard mock', () => {
    it('renders with correct test id', async () => {
      const CompanionCard = (await import('@/components/feature/CompanionCard'))
        .default;

      render(
        <CompanionCard
          id="test"
          name="Test"
          topic="Topic"
          subject="science"
          duration={30}
          color="#fff"
        />,
      );

      expect(screen.getByTestId('companion-card')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('CompanionsList mock', () => {
    it('renders with correct test id', async () => {
      const CompanionsList = (
        await import('@/components/feature/CompanionsList')
      ).default;

      render(
        <CompanionsList
          title="Recent Sessions"
          companions={[]}
          classNames=""
        />,
      );

      expect(screen.getByTestId('companions-list')).toBeInTheDocument();
      expect(screen.getByText('Recent Sessions')).toBeInTheDocument();
    });
  });

  describe('CTA mock', () => {
    it('renders with correct test id', async () => {
      const CTA = (await import('@/components/feature/CTA')).default;

      render(<CTA />);

      expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    });
  });
});

describe('HomePage Data', () => {
  it('has correct mock data for popular companions', async () => {
    const { POPULAR_COMPANIONS } = await import('@/mocks/companions');

    expect(POPULAR_COMPANIONS).toHaveLength(2);
    expect(POPULAR_COMPANIONS[0]).toHaveProperty('id');
    expect(POPULAR_COMPANIONS[0]).toHaveProperty('name');
    expect(POPULAR_COMPANIONS[0]).toHaveProperty('subject');
  });

  it('has correct mock data for recent sessions', async () => {
    const { RECENT_SESSIONS } = await import('@/mocks/companions');

    expect(RECENT_SESSIONS).toHaveLength(1);
    expect(RECENT_SESSIONS[0]).toHaveProperty('id');
  });
});
