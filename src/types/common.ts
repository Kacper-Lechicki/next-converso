export interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface NavbarItem {
  labelKey: string;
  href: string;
}

export interface SavedMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}
