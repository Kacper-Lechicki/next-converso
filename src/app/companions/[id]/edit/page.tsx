import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import { getCompanion } from '@/actions/companion';
import CompanionEditor from '@/components/feature/CompanionEditor';

interface EditCompanionPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EditCompanionPage = async ({
  params,
  searchParams,
}: EditCompanionPageProps) => {
  const { id } = await params;
  const { callbackUrl } = await searchParams;
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
    <CompanionEditor
      title={t('title')}
      initialData={{
        name: companion.name,
        subject: companion.subject as string,
        topic: companion.topic,
        voice: companion.voice || '',
        style: companion.style || '',
        duration: companion.duration,
      }}
      companionId={companion.id}
      callbackUrl={callbackUrl as string}
    />
  );
};

export default EditCompanionPage;
