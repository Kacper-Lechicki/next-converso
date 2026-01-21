type CompanionSessionPageParams = {
  id: string;
};

interface CompanionSessionPageProps {
  params: Promise<CompanionSessionPageParams>;
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  return <div>CompanionSessionPage: {JSON.stringify(id)}</div>;
};

export default CompanionSessionPage;
