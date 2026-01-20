import { getTranslations } from 'next-intl/server';

import CompanionCard from '@/components/feature/CompanionCard';
import CompanionsList from '@/components/feature/CompanionsList';
import CTA from '@/components/feature/CTA';
import { Companion } from '@/types';
import { POPULAR_COMPANIONS, RECENT_SESSIONS } from '@/mocks/companions';

const Page = async () => {
  const t = await getTranslations('Home');

  return (
    <main>
      <h1 id="popular-heading" className="text-3xl">
        {t('popular_companions')}
      </h1>

      <section className="home-section">
        {POPULAR_COMPANIONS.map((companion: Companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title={t('recently_completed_sessions')}
          companions={RECENT_SESSIONS}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA />
      </section>
    </main>
  );
};

export default Page;
