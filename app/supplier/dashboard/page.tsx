import WorkInProgress from '@/components/WorkInProgress';

export default function SupplierDashboardPage() {
  return (
    <WorkInProgress
      title="Supplier Control Centre"
      description="Analytics, lead management, and catalog optimisation widgets will surface here soon."
      suggestions={[
        'Complete your supplier registration to get early dashboard access',
        'Sync product data with our onboarding team via CSV templates',
        'Use Messages to respond to RFQs while we finish the dashboard',
      ]}
    />
  );
}
