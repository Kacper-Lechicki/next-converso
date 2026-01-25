import { getTranslations } from 'next-intl/server';

import CompanionCard from '@/components/feature/CompanionCard';
import CompanionsList from '@/components/feature/CompanionsList';
import CTA from '@/components/feature/CTA';
import { POPULAR_COMPANIONS, RECENT_SESSIONS } from '@/mocks/companions';
import { Companion } from '@/types';

const HomePage = async () => {
  const t = await getTranslations('HomePage');

  return (
    <div className="flex flex-col gap-8">
      <h1 id="popular-heading" className="text-3xl">
        {t('popular_companions')}
      </h1>

      <section className="companions-grid" aria-labelledby="popular-heading">
        {POPULAR_COMPANIONS.map((companion: Companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>

      <section
        className="home-section"
        aria-label={t('recently_completed_sessions')}
      >
        <CompanionsList
          title={t('recently_completed_sessions')}
          companions={RECENT_SESSIONS}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA />
      </section>
    </div>
  );
};

export default HomePage;
