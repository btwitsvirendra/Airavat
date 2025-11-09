import WorkInProgress from '@/components/WorkInProgress';

export default function IOSDownloadPage() {
  return (
    <WorkInProgress
      title="Airavat iOS App"
      description="The iOS experience is in TestFlight right now—public release coming soon."
      suggestions={[
        'Apply for TestFlight access through your account manager',
        'Enable notifications so we can alert you on launch day',
        'Continue managing trade from the responsive web app meanwhile',
      ]}
      ctaLabel="Request TestFlight access"
    />
  );
}
