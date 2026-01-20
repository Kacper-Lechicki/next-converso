import { describe, expect, test } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  test('merges class names correctly', () => {
    expect(cn('w-4', 'h-4')).toBe('w-4 h-4');
  });

  test('handles conditional classes', () => {
    expect(cn('w-4', true && 'h-4', false && 'bg-red-500')).toBe('w-4 h-4');
  });

  test('merges tailwind conflicts (tailwind-merge behavior)', () => {
    expect(cn('p-4 p-2')).toBe('p-2');
    expect(cn('bg-red-500 bg-blue-500')).toBe('bg-blue-500');
  });
});
