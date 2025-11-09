import WorkInProgress from '@/components/WorkInProgress';

export default function AppLandingPage() {
  return (
    <WorkInProgress
      title="Airavat Mobile Apps"
      description="Unified mobile experiences for buyers and suppliers will launch shortly."
      suggestions={[
        'Register for Android or iOS beta from the download pages',
        'Enable WhatsApp updates inside My Airavat for shipment alerts',
        'Use desktop web for end-to-end trade management for now',
      ]}
      ctaLabel="Notify me about mobile apps"
    />
  );
}
