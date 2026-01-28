'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import {
  Companion,
  CreateCompanion,
  GetAllCompanions,
  UpdateCompanion,
} from '@/types';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

export const createCompanion = async (
  formData: Omit<CreateCompanion, 'author'>,
) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error('User is not authenticated');
  }

  const supabase = createClient();

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

export const updateCompanion = async ({ id, ...formData }: UpdateCompanion) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const supabase = createClient();

  const { data: existingCompanion } = await supabase
    .from('companions')
    .select('author')
    .eq('id', id)
    .single();

  if (!existingCompanion || existingCompanion.author !== userId) {
    throw new Error('Unauthorized');
  }

  const { data, error } = await supabase
    .from('companions')
    .update(formData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/companions/${id}`);
  revalidatePath('/companions');

  return data;
};

export const deleteCompanion = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const supabase = createClient();

  const { data: existingCompanion } = await supabase
    .from('companions')
    .select('author')
    .eq('id', id)
    .single();

  if (!existingCompanion || existingCompanion.author !== userId) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase.from('companions').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/companions');
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createClient();
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * safeLimit;

  let query = supabase.from('companions').select('*');

  const subjectTerm = Array.isArray(subject) ? subject[0] : subject;
  const topicTerm = Array.isArray(topic) ? topic[0] : topic;

  if (subjectTerm) {
    query = query.ilike('subject', `%${subjectTerm}%`);
  }

  if (topicTerm) {
    query = query.or(`topic.ilike.%${topicTerm}%,name.ilike.%${topicTerm}%`);
  }

  const { data: companions, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + safeLimit - 1);

  if (error) {
    throw new Error(error?.message || 'Failed to fetch companions');
  }

  return companions || [];
};

export const getCompanion = async (id: string) => {
  const uuidSchema = z.string().uuid('Invalid companion ID format');
  const validationResult = uuidSchema.safeParse(id);

  if (!validationResult.success) {
    return null;
  }

  const validatedId = validationResult.data;
  const supabase = createClient();

  const { data: companion, error } = await supabase
    .from('companions')
    .select('*')
    .eq('id', validatedId)
    .maybeSingle();

  if (error) {
    return null;
  }

  return companion ?? null;
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createClient();

  const { data, error } = await supabase.from('session_history').insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) {
    return null;
  }

  revalidatePath('/');

  return data;
};

export const getRecentSessions = async (limit = 10): Promise<Companion[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('session_history')
    .select('companions:companion_id (*)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  return data
    .map(({ companions }) =>
      Array.isArray(companions) ? companions[0] : companions,
    )
    .filter((params) => !!params) as Companion[];
};

export const getUserSessions = async (
  userId: string,
  limit = 10,
): Promise<Companion[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('session_history')
    .select('companions:companion_id (*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  return data
    .map(({ companions }) =>
      Array.isArray(companions) ? companions[0] : companions,
    )
    .filter((params) => !!params) as Companion[];
};

export const getUserCompanions = async (
  userId: string,
): Promise<Companion[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('companions')
    .select('*')
    .eq('author', userId);

  if (error) {
    return [];
  }

  return (data as Companion[]) || [];
};
