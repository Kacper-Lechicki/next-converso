import { Subject } from '@/types';

export const SUBJECTS: Subject[] = [
  'maths',
  'language',
  'science',
  'history',
  'coding',
  'economics',
];

export const SUBJECTS_COLORS = {
  science: '#E5D0FF',
  maths: '#FFDA6E',
  language: '#BDE7FF',
  coding: '#FFC8E4',
  history: '#FFECC8',
  economics: '#C8FFDF',
};

export const VOICES = {
  male: { casual: '2BJW5coyhAzSr8STdHbE', formal: 'c6SfcYrb2t09NHXiT80T' },
  female: { casual: 'ZIlrSGI4jZqobxRKprJz', formal: 'sarah' },
};
