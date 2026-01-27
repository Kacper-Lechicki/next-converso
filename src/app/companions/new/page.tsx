import { auth } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import CompanionForm from '@/components/feature/CompanionForm';
import BackButton from '@/components/ui/back-button';
import { COMPANION_PAGE_DOTS } from '@/config/app';

const DotsVisual = ({ className }: { className?: string }) => (
  <div className={`relative w-full h-full overflow-hidden ${className}`}>
    {COMPANION_PAGE_DOTS.map((dot, index) => (
      <div
        key={index}
        className={`absolute rounded-full ${dot.size}`}
        style={{
          backgroundColor: dot.color,
          top: dot.top,
          left: dot.left,
          opacity: 0.8,
        }}
      />
    ))}
  </div>
);

const NewCompanionPage = async () => {
  const t = await getTranslations('NewCompanionPage');
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="flex w-full min-h-full flex-col lg:flex-row gap-8 lg:gap-24 relative isolate">
      <div className="absolute inset-0 lg:hidden z-0 overflow-hidden pointer-events-none">
        <DotsVisual />
      </div>

      <section className="flex flex-col gap-6 w-full lg:w-1/2 relative z-10">
        <div className="w-fit">
          <BackButton />
        </div>

        <h1 className="text-3xl font-bold">{t('companion_builder')}</h1>

        <CompanionForm />
      </section>

      <section className="hidden lg:flex w-1/2 min-h-full relative overflow-hidden items-center justify-center p-8 pointer-events-none">
        <div className="absolute inset-0">
          <DotsVisual />
        </div>
      </section>
    </div>
  );
};

export default NewCompanionPage;
