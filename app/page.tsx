import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const Page = () => {
  const t = useTranslations('home');

  return (
    <div>
      <h1 className="text-2xl underline">{t('title')}</h1>
      <Button>{t('startButton')}</Button>
    </div>
  );
};

export default Page;
