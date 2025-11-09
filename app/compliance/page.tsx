import WorkInProgress from '@/components/WorkInProgress';

export default function CompliancePage() {
  return (
    <WorkInProgress
      title="Compliance & Certifications"
      description="Listings of mandatory certificates, sustainability disclosures, and audit logs are under construction."
      suggestions={[
        'Upload existing certifications via your account manager',
        'Schedule inspections from Trade Services to keep compliance current',
        'Follow our LinkedIn page for policy update announcements',
      ]}
    />
  );
}
