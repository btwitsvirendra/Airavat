import WorkInProgress from '@/components/WorkInProgress';

export default function GlobalDiscoveryPage() {
  return (
    <WorkInProgress
      title="Global Expo"
      description="We're designing an immersive showcase of international suppliers and pavilions."
      suggestions={[
        'Browse Discover clusters for curated Indian supplier groups today',
        'Submit your RFQ to reach global suppliers already on Airavat',
        'Reach out to our sourcing concierge for cross-border requirements',
      ]}
    />
  );
}
