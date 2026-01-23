export type Subject =
  | 'maths'
  | 'language'
  | 'science'
  | 'history'
  | 'coding'
  | 'geography'
  | 'economics'
  | 'finance'
  | 'business';

export interface Companion {
  id: string;
  name: string;
  subject: Subject | string;
  topic: string;
  duration: number;
  color: string;
  bookmarked?: boolean;
}

export interface CreateCompanion {
  name: string;
  subject: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
  author?: string;
}

export interface GetAllCompanions {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
}
