import WorkInProgress from '@/components/WorkInProgress';

export default function CovidResourcesPage() {
  return (
    <WorkInProgress
      title="Compliance & Health Declarations"
      description="Pandemic response protocols and regulatory updates are being refreshed to match the latest mandates."
      suggestions={[
        'Request supplier compliance certificates from the Messages tab',
        'Coordinate inspections through the Trade Services section',
        'Bookmark this page for the newest advisory updates',
      ]}
    />
  );
}
