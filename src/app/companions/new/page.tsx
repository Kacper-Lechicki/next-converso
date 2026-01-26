import { auth } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import CompanionForm from '@/components/feature/CompanionForm';
import BackButton from '@/components/ui/back-button';

const NewCompanionPage = async () => {
  const t = await getTranslations('NewCompanionPage');
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      <article className="w-full gap-4 flex flex-col lg:w-1/2 ">
        <BackButton />
        <h1>{t('companion_builder')}</h1>
        <CompanionForm />
      </article>
    </div>
  );
};

export default NewCompanionPage;
