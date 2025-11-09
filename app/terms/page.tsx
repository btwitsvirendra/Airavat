import WorkInProgress from '@/components/WorkInProgress';

export default function TermsPage() {
  return (
    <WorkInProgress
      title="Terms of Use"
      description="The legal framework for using Airavat is currently under review."
      suggestions={[
        'Discuss commercial contracts with your Airavat account manager',
        'Review trade service agreements for payment and logistics coverage',
        'Subscribe here to receive updated policy PDFs once published',
      ]}
    />
  );
}
