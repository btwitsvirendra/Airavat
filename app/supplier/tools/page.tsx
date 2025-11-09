import WorkInProgress from '@/components/WorkInProgress';

export default function SupplierToolsPage() {
  return (
    <WorkInProgress
      title="Supplier Tools"
      description="Catalog uploaders, RFQ responders, and analytics widgets are being polished for launch."
      suggestions={[
        'Prepare product images and specs to upload once tools go live',
        'Talk to the supplier success team for listing best practices',
        'Test buyer journeys by browsing the main marketplace page',
      ]}
    />
  );
}
