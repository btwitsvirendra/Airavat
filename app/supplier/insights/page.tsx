import WorkInProgress from '@/components/WorkInProgress';

export default function SupplierInsightsPage() {
  return (
    <WorkInProgress
      title="Market Insights for Suppliers"
      description="Category demand dashboards and buyer search trends are on their way."
      suggestions={[
        'Monitor buyer RFQs in Messages for real-time signals',
        'Talk to Airavat analysts for priority market reports',
        'Optimise listings with keywords used on the Discover page',
      ]}
    />
  );
}
