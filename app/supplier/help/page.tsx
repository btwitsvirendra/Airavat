import WorkInProgress from '@/components/WorkInProgress';

export default function SupplierHelpPage() {
  return (
    <WorkInProgress
      title="Supplier Help Desk"
      description="We are preparing onboarding FAQs, compliance playbooks, and escalation workflows for suppliers."
      suggestions={[
        'Message the supplier success team for listing support',
        'Attend upcoming webinars listed on the Events page',
        'Keep your documentation ready for verification calls',
      ]}
    />
  );
}
