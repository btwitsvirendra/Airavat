import WorkInProgress from '@/components/WorkInProgress';

export default function HowToBuyPage() {
  return (
    <WorkInProgress
      title="Buyer Playbook"
      description="Step-by-step sourcing guides, procurement SOPs, and onboarding tutorials are almost ready."
      suggestions={[
        'Start by browsing the Discover clusters curated for your category',
        'Use the RFQ tool to share detailed requirements with suppliers',
        'Book logistics under the Trade Services tab once your order is confirmed',
      ]}
    />
  );
}
