import WorkInProgress from '@/components/WorkInProgress';

export default function AndroidDownloadPage() {
  return (
    <WorkInProgress
      title="Airavat Android App"
      description="We're wrapping up QA before publishing the Android build."
      suggestions={[
        'Join the beta list to test sourcing on mobile',
        'Use the web marketplace for complete functionality today',
        'Save this page to get notified when the APK goes live',
      ]}
      ctaLabel="Join Android beta list"
    />
  );
}
