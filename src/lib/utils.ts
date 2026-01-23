import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { SUBJECTS_COLORS } from '@/config/app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return SUBJECTS_COLORS[subject as keyof typeof SUBJECTS_COLORS];
};
