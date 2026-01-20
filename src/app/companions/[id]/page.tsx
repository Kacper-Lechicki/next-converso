type CompanionSessionPageParams = {
  id: string;
};

interface CompanionSessionPageProps {
  params: Promise<CompanionSessionPageParams>;
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps) => {
  const resolvedParams = await params;
  return <div>CompanionSessionPage: {JSON.stringify(resolvedParams)}</div>;
};

export default CompanionSessionPage;
