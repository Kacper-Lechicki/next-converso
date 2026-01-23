'use server';

import { createClient } from '@/lib/supabase/server';
import { CreateCompanion } from '@/types';
import { auth } from '@clerk/nextjs/server';

export const createCompanion = async (
  formData: Omit<CreateCompanion, 'author'>,
) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error('User is not authenticated');
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to create a companion');
  }

  return data;
};
