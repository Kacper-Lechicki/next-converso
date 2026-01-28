import { getCompanion } from '@/actions/companion';
import CompanionSessionView from '@/components/feature/CompanionSessionView';
import { Companion } from '@/types';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type CompanionSessionPageParams = {
  id: string;
};

interface CompanionSessionPageProps {
  params: Promise<CompanionSessionPageParams>;
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const user: User | null = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const companion: Companion = await getCompanion(id);

  if (!companion) {
    redirect('/companions');
  }

  return (
    <CompanionSessionView
      companion={companion}
      user={{
        id: user.id,
        firstName: user.firstName!,
        imageUrl: user.imageUrl!,
      }}
    />
  );
};

export default CompanionSessionPage;
