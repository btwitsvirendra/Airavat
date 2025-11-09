import WorkInProgress from '@/components/WorkInProgress';

export default function BuyerHelpPage() {
  return (
    <WorkInProgress
      title="Buyer Help Center"
      description="We're assembling troubleshooting guides, policy docs, and expert videos to support your sourcing journey."
      suggestions={[
        'Ask quick questions using the chat widget on supplier profiles',
        'Browse the Trade Services hub for onboarding checklists',
        'Write to support@airavat.com for priority enterprise support',
      ]}
    />
  );
}
