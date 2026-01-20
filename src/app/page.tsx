import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

const Page = () => {
  const t = useTranslations();

  return (
    <div>
      <h1 className="text-2xl underline">{t('Home.title')}</h1>
      <Button>{t('Home.start_button')}</Button>
    </div>
  );
};

export default Page;
