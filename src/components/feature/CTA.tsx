import { useTranslations } from 'next-intl';

const CTA = () => {
  const t = useTranslations('Feature');
  return <div>{t('cta')}</div>;
};

export default CTA;
