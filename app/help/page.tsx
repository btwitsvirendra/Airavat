import WorkInProgress from '@/components/WorkInProgress';

export default function HelpCenterPage() {
  return (
    <WorkInProgress
      title="Airavat Help Center"
      description="We're crafting a central knowledge base for buyers and suppliers."
      suggestions={[
        'Visit Buyer Help or Supplier Help sections for tailored guidance',
        'Reach out via support@airavat.com for immediate assistance',
        'Check the Messages inbox for supplier replies in real time',
      ]}
    />
  );
}
