import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import { getCompanion } from '@/actions/companion';
import CompanionForm from '@/components/feature/CompanionForm';

interface EditCompanionPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditCompanionPage = async ({ params }: EditCompanionPageProps) => {
  const { id } = await params;
  const user = await currentUser();
  const t = await getTranslations('EditCompanionPage');

  if (!user) {
    redirect('/sign-in');
  }

  const companion = await getCompanion(id);

  if (!companion) {
    redirect('/companions');
  }

  if (companion.author !== user.id) {
    redirect('/companions');
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <CompanionForm
        initialData={{
          name: companion.name,
          subject: companion.subject as string,
          topic: companion.topic,
          voice: companion.voice || '',
          style: companion.style || '',
          duration: companion.duration,
        }}
        companionId={companion.id}
      />
    </div>
  );
};

export default EditCompanionPage;
