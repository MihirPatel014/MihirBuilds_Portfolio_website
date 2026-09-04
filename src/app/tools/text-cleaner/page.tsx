import { Metadata } from 'next';
import { TextCleanerTool } from '@/components/tools/TextCleanerTool';

export const metadata: Metadata = {
  title: 'Free Online Text Cleaner & Formatter | Strip HTML, Spaces & Duplicates',
  description:
    'Free online text cleaner tool. Remove extra whitespace, strip HTML tags, delete duplicate lines, remove empty lines, numbers, emojis, sort lines, and find-replace.',
  keywords: [
    'text cleaner',
    'remove extra spaces',
    'strip html tags',
    'remove duplicate lines',
    'text formatter online',
    'remove empty lines',
    'find and replace online',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/text-cleaner',
  },
};

export default function TextCleanerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/text-cleaner',
        name: 'Text Cleaner & Formatter',
        applicationCategory: 'TextEditor',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/text-cleaner',
        description: 'Clean whitespace, strip HTML, remove duplicate lines, and format text.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mihirbuilds.com' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.mihirbuilds.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Text Cleaner', item: 'https://www.mihirbuilds.com/tools/text-cleaner' },
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
      <TextCleanerTool />
    </>
  );
}
