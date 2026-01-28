import { getUserCompanions, getUserSessions } from '@/actions/companion';
import CompanionsList from '@/components/feature/CompanionsList';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ASSETS } from '@/config/assets';
import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const t = await getTranslations('ProfilePage');

  const [companions, sessionHistory] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id),
  ]);

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <section className="flex w-full justify-between gap-8 max-lg:flex-col items-center">
        <div className="flex gap-4 items-center flex-wrap">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full object-cover shrink"
          />

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>

            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
          <div className="border bg-card text-card-foreground rounded-xl p-4 gap-2 flex flex-col h-full min-w-[140px]">
            <div className="flex gap-2 items-center">
              <Image
                src={ASSETS.icons.check}
                alt={t('check_alt')}
                width={22}
                height={22}
                className="w-[22px] h-[22px]"
              />

              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>

            <div className="text-sm text-muted-foreground">
              {t('lessons_completed')}
            </div>
          </div>

          <div className="border bg-card text-card-foreground rounded-xl p-4 gap-2 flex flex-col h-full min-w-[140px]">
            <div className="flex gap-2 items-center">
              <Image
                src={ASSETS.icons.cap}
                alt={t('cap_alt')}
                width={22}
                height={22}
                className="w-[22px] h-[22px]"
              />

              <p className="text-2xl font-bold">{companions.length}</p>
            </div>

            <div className="text-sm text-muted-foreground">
              {t('companions_created')}
            </div>
          </div>
        </div>
      </section>

      <Accordion type="multiple" defaultValue={['recent', 'companions']}>
        <AccordionItem value="recent" className="border-b-0">
          <AccordionTrigger className="text-2xl font-bold hover:no-underline">
            {t('recent_sessions')}
          </AccordionTrigger>

          <AccordionContent>
            <CompanionsList
              title={t('recent_sessions')}
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companions" className="border-b-0">
          <AccordionTrigger className="text-2xl font-bold hover:no-underline">
            {t('my_companions')} {`(${companions.length})`}
          </AccordionTrigger>

          <AccordionContent>
            <CompanionsList
              title={t('my_companions')}
              companions={companions}
              emptyStateTitle={t('no_companions_found')}
              emptyStateDescription={t('no_companions_description')}
              emptyStateIcon={ASSETS.icons.search}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProfilePage;
