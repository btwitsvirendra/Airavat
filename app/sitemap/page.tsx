import WorkInProgress from '@/components/WorkInProgress';

export default function SitemapPage() {
  return (
    <WorkInProgress
      title="Sitemap"
      description="We're mapping the full Airavat experience—exportable sitemaps and navigation aids are coming soon."
      suggestions={[
        'Use the primary navigation bar to jump between marketplace sections',
        'Bookmark Discover and Trade Services for quick access to key pages',
        'Reach out via support if you need a guided sourcing walkthrough',
      ]}
    />
  );
}
