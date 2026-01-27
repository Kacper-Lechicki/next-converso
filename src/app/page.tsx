import { getTranslations } from 'next-intl/server';

import { getAllCompanions, getRecentSessions } from '@/actions/companion';
import CompanionCard from '@/components/feature/CompanionCard';
import CompanionsList from '@/components/feature/CompanionsList';
import CTA from '@/components/feature/CTA';
import { getSubjectColor } from '@/lib/utils';
import { Companion } from '@/types';

const HomePage = async () => {
  const t = await getTranslations('HomePage');
  const companions: Companion[] = (await getAllCompanions({ limit: 3 })) || [];
  const recentSessionCompanions: Companion[] =
    (await getRecentSessions(10)) || [];

  return (
    <div className="flex flex-col gap-8">
      <h1 id="popular-heading" className="text-3xl">
        {t('popular_companions')}
      </h1>

      <section className="companions-grid" aria-labelledby="popular-heading">
        {companions.map((companion: Companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section
        className="home-section"
        aria-label={t('recently_completed_sessions')}
      >
        <CompanionsList
          title={t('recently_completed_sessions')}
          companions={recentSessionCompanions}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA />
      </section>
    </div>
  );
};

export default HomePage;
