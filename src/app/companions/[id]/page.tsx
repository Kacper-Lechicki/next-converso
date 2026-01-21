type CompanionSessionPageParams = {
  id: string;
};

interface CompanionSessionPageProps {
  params: Promise<CompanionSessionPageParams>;
}

import { POPULAR_COMPANIONS } from '@/mocks/companions';

export async function generateStaticParams() {
  return POPULAR_COMPANIONS.map((companion) => ({
    id: companion.id,
  }));
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps) => {
  const resolvedParams = await params;
  return <div>CompanionSessionPage: {JSON.stringify(resolvedParams)}</div>;
};

export default CompanionSessionPage;
