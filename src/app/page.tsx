import CompanionCard from '@/components/feature/CompanionCard';
import CompanionsList from '@/components/feature/CompanionsList';
import CTA from '@/components/feature/CTA';

import { Companion } from '@/types';
import { POPULAR_COMPANIONS } from '@/mocks/companions';

import { getTranslations } from 'next-intl/server';

const Page = async () => {
  const t = await getTranslations('Home');

  return (
    <main>
      <h1 id="popular-heading" className="text-2xl underline">
        {t('popularCompanions')}
      </h1>

      <section className="home-section" aria-labelledby="popular-heading">
        {POPULAR_COMPANIONS.map((companion: Companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>

      <section className="home-section" aria-label={t('additionalFeatures')}>
        <CompanionsList />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
