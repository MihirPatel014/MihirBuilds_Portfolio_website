import { Metadata } from 'next';
import { Suspense } from 'react';
import { ToolsExplorer } from '@/components/tools/ToolsExplorer';

export const metadata: Metadata = {
  title: 'Free Online Tools & Developer Utilities | MihirBuilds',
  description:
    'Explore 100+ free online developer tools, PDF converters, text formatters, and automation utilities. 100% private, client-side, with no signup required.',
  keywords: [
    'free online tools',
    'developer tools',
    'json formatter',
    'online utilities',
    'pdf tools',
    'base64 encoder',
    'jwt debugger',
    'seo tools',
    'whatsapp tools',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools',
  },
  openGraph: {
    title: 'Free Online Tools & Developer Utilities | MihirBuilds',
    description:
      'Fast, private, and free browser-based utilities for developers and business teams. Zero signup, 100% client-side security.',
    url: 'https://www.mihirbuilds.com/tools',
    siteName: 'MihirBuilds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools & Developer Utilities | MihirBuilds',
    description:
      'Explore 100+ free online developer tools and utilities. Fast, client-side, zero signup.',
  },
};

export default function ToolsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.mihirbuilds.com/tools',
        name: 'Free Online Tools & Developer Utilities',
        description:
          'Comprehensive collection of free online developer and automation tools including JSON formatters, base64 converters, and PDF tools.',
        url: 'https://www.mihirbuilds.com/tools',
        isPartOf: {
          '@type': 'WebSite',
          name: 'MihirBuilds',
          url: 'https://www.mihirbuilds.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.mihirbuilds.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://www.mihirbuilds.com/tools',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are all tools on MihirBuilds 100% free to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, every online tool on MihirBuilds is 100% free with unlimited usage, zero paywalls, and no hidden subscriptions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data secure and private when using online utilities?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All formatting, validation, and conversion processes run 100% client-side inside your web browser. No data or files are ever sent to remote servers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to install software or sign up?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No installation or registration is needed. You can use all developer and PDF tools instantly in any modern web browser.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#F8FAFC] pt-32 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-sm text-gray-500">Loading tools...</p>
          </div>
        }
      >
        <ToolsExplorer />
      </Suspense>
    </>
  );
}
