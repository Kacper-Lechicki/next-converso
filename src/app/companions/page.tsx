import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { ASSETS } from '@/config/assets';
import { currentUser } from '@clerk/nextjs/server';

import { getAllCompanions } from '@/actions/companion';
import CompanionCard from '@/components/feature/CompanionCard';
import EmptyState from '@/components/feature/EmptyState';
import SearchInput from '@/components/feature/SearchInput';

import SubjectFilter from '@/components/feature/SubjectFilter';
import { getSubjectColor } from '@/lib/utils';
import { Companion, SearchParams } from '@/types';

export async function generateMetadata() {
  const t = await getTranslations('CompanionsPage');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const CompanionsLibraryPage = async ({ searchParams }: SearchParams) => {
  const user = await currentUser();
  const t = await getTranslations('CompanionsPage');
  const filters = await searchParams;
  const subject = filters.subject ? (filters.subject as string) : '';
  const topic = filters.topic ? (filters.topic as string) : '';
  const companions = await getAllCompanions({ subject, topic });
  const isEmpty = !companions || companions.length === 0;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col xl:flex-row justify-between gap-6 xl:items-center">
        <h1 className="text-3xl font-bold">{t('title')}</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="w-full sm:w-[320px]">
            <SearchInput />
          </div>

          <SubjectFilter />

          <Link
            href="/companions/new"
            className="btn-primary w-fit justify-center whitespace-nowrap"
          >
            <Image
              src={ASSETS.icons.plus}
              alt=""
              width={12}
              height={12}
              aria-hidden="true"
              className="w-[12px] h-[12px]"
            />
            {t('add_companion')}
          </Link>
        </div>
      </section>

      <section className="companions-grid">
        {isEmpty ? (
          <div className="col-span-full">
            <EmptyState
              title={t('no_companions_found')}
              description={t('no_companions_description')}
              icon={ASSETS.icons.search}
            />
          </div>
        ) : (
          companions.map((companion: Companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
              currentUserId={user?.id}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default CompanionsLibraryPage;
