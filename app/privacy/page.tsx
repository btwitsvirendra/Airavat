import WorkInProgress from '@/components/WorkInProgress';

export default function PrivacyPage() {
  return (
    <WorkInProgress
      title="Privacy Policy"
      description="We're drafting detailed privacy documentation that reflects Airavat's security practices."
      suggestions={[
        'Reach out to compliance@airavat.com for data processing queries',
        'Review Trade Assurance for how payments are safeguarded',
        'Check back soon for downloadable policy PDFs',
      ]}
    />
  );
}
