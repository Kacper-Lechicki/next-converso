'use client';

import { useTranslations } from 'next-intl';

const CompanionsList = () => {
  const t = useTranslations('Feature');
  return <div>{t('companionsList')}</div>;
};

export default CompanionsList;
