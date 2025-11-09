import WorkInProgress from '@/components/WorkInProgress';

export default function FinancingPage() {
  return (
    <WorkInProgress
      title="Trade Financing"
      description="We're finalising partnerships with NBFCs and banks to unlock flexible payment terms for Airavat buyers."
      suggestions={[
        'Review eligible invoice values with your sourcing manager',
        'Upload GST and financial documents under My Airavat to fast-track onboarding',
        'Bookmark this page for updates on credit lines and LC facilitation',
      ]}
    />
  );
}
