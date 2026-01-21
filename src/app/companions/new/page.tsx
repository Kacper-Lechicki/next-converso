'use client';

import CompanionForm from '@/components/feature/CompanionForm';
import { useTranslations } from 'next-intl';

const NewCompanionPage = () => {
  const t = useTranslations('NewCompanionPage');

  return (
    <div className="flex flex-col gap-8 lg:w-1/2 items-center justify-center">
      <article className="w-full gap-4 flex flex-col">
        <h1>{t('companion_builder')}</h1>
        <CompanionForm />
      </article>
    </div>
  );
};

export default NewCompanionPage;
