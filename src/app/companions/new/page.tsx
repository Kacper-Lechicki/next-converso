import { auth } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import CompanionEditor from '@/components/feature/CompanionEditor';

const NewCompanionPage = async () => {
  const t = await getTranslations('NewCompanionPage');
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <CompanionEditor title={t('companion_builder')} />;
};

export default NewCompanionPage;
