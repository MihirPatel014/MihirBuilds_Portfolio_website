import { Metadata } from 'next';
import { WordCounterTool } from '@/components/tools/WordCounterTool';

export const metadata: Metadata = {
  title: 'Free Online Word & Character Counter | Reading Time & Keyword Density',
  description:
    'Real-time online word counter, character counter with and without spaces, sentence counter, estimated reading and speaking time, and keyword frequency analyzer.',
  keywords: [
    'word counter',
    'character counter',
    'word count online',
    'reading time calculator',
    'keyword density',
    'free text tools',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/word-counter',
  },
};

export default function WordCounterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/word-counter',
        name: 'Word & Character Counter',
        applicationCategory: 'TextEditor',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/word-counter',
        description: 'Real-time word, character, and sentence counter with reading time estimation.',
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
          { '@type': 'ListItem', position: 3, name: 'Word Counter', item: 'https://www.mihirbuilds.com/tools/word-counter' },
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
      <WordCounterTool />
    </>
  );
}
