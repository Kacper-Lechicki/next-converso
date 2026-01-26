import { currentUser, User } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getCompanion } from '@/actions/companion';
import CompanionComponent from '@/components/feature/CompanionComponent';
import SubjectBadge from '@/components/feature/SubjectBadge';
import BackButton from '@/components/ui/back-button';
import { ASSETS } from '@/config/assets';
import { Companion } from '@/types';

type CompanionSessionPageParams = {
  id: string;
};

interface CompanionSessionPageProps {
  params: Promise<CompanionSessionPageParams>;
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const user: User | null = await currentUser();
  const t = await getTranslations('CompanionSessionPage');

  if (!user) {
    redirect('/sign-in');
  }

  const companion: Companion = await getCompanion(id);

  if (!companion) {
    redirect('/companions');
  }

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <BackButton className="w-fit" />
      <article className="relative flex flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6 overflow-hidden bg-white rounded-[2rem] border border-black shadow-sm">
        <SubjectBadge
          subject={companion.subject ?? 'maths'}
          classNames="max-md:hidden size-[50px] sm:size-[60px] shrink-0 rounded-2xl text-xl transition-transform hover:scale-105"
          size={30}
        />

        <div className="flex flex-col gap-1 min-w-0 flex-1 pr-12 sm:pr-24">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-bold text-xl sm:text-2xl leading-tight text-foreground truncate">
              {companion.name}
            </h1>

            <div className="bg-black text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
              {companion.subject}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {companion.topic}
          </p>
        </div>

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-lg">
          <Image
            src={ASSETS.icons.clock}
            alt={t('duration_alt')}
            width={16}
            height={16}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
            {companion.duration}
            <span className="hidden sm:inline"> {t('minutes')}</span>
            <span className="sm:hidden"> {t('minutes_short')}</span>
          </p>
        </div>
      </article>

      <CompanionComponent
        {...companion}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </div>
  );
};

export default CompanionSessionPage;
