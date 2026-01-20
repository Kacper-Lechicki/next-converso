interface CompanionSessionPageParams {
  id: string;
}

const CompanionSessionPage = ({
  params,
}: {
  params: CompanionSessionPageParams;
}) => {
  return <div>CompanionSessionPage: {JSON.stringify(params)}</div>;
};

export default CompanionSessionPage;
