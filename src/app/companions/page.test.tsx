import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CompanionsLibraryPage from './page';

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) =>
      key === 'title' ? 'Companions Library' : key,
    ),
}));

vi.mock('@/actions/companion', () => ({
  getAllCompanions: vi.fn().mockResolvedValue([
    {
      id: '550e8400-e29b-41d4-a716-446655440200',
      name: 'Test Companion',
      subject: 'maths',
      topic: 'Algebra',
      duration: 30,
      color: '#fff',
    },
  ]),
}));

vi.mock('@/components/feature/SearchInput', () => ({
  default: () => <div data-testid="search-input" />,
}));

vi.mock('@/components/feature/SubjectFilter', () => ({
  default: () => <div data-testid="subject-filter" />,
}));

vi.mock('@/components/feature/CompanionCard', () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="companion-card">{name}</div>
  ),
}));

describe('CompanionsLibraryPage', () => {
  it('renders correctly with companions', async () => {
    const searchParams = Promise.resolve({ subject: '', topic: '' });
    const component = await CompanionsLibraryPage({ searchParams });

    render(component);

    expect(screen.getByText('Companions Library')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('subject-filter')).toBeInTheDocument();
    expect(screen.getByTestId('companion-card')).toBeInTheDocument();
    expect(screen.getByText('Test Companion')).toBeInTheDocument();
  });

  it('passes filters to getAllCompanions', async () => {
    const getAllCompanionsMock = (await import('@/actions/companion'))
      .getAllCompanions;

    const searchParams = Promise.resolve({
      subject: 'science',
      topic: 'physics',
    });

    const component = await CompanionsLibraryPage({ searchParams });
    render(component);

    expect(getAllCompanionsMock).toHaveBeenCalledWith({
      subject: 'science',
      topic: 'physics',
    });
  });
});
