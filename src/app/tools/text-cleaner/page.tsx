import { Metadata } from 'next';
import { TextCleanerTool } from '@/components/tools/TextCleanerTool';

export const metadata: Metadata = {
  title: 'Clean Text & Text Formatting Online | Free Text Cleaner Tool',
  description:
    'Free online text cleaner and text formatting tool. Remove extra whitespace, strip HTML tags and attributes, eliminate duplicate lines, decode entities, change letter case, remove non-ASCII/emojis, convert quotes, and find-replace in your browser.',
  keywords: [
    'clean text',
    'text cleaner',
    'text formatting online',
    'remove extra spaces',
    'strip html tags',
    'remove duplicate lines',
    'remove emojis online',
    'unescape html tags',
    'remove letter accents',
    'decode html entities',
    'smart quotes to regular',
    'find and replace online',
    'free text unformatter',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/text-cleaner',
  },
  openGraph: {
    title: 'Clean Text & Text Formatting Online | Free Text Cleaner Tool',
    description:
      'All-in-one client-side text cleaner: remove redundant whitespace, strip HTML/styles, eliminate duplicate lines, format letter cases, and customize find & replace.',
    url: 'https://www.mihirbuilds.com/tools/text-cleaner',
    siteName: 'MihirBuilds',
    type: 'website',
  },
};

export default function TextCleanerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/text-cleaner',
        name: 'Clean Text & Text Formatting Online',
        applicationCategory: 'TextEditor',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/text-cleaner',
        description:
          'Free online tool to unformat text, strip HTML markup, remove redundant whitespace, delete duplicate lines, convert letter cases, and find-replace.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'HowTo',
        name: 'How to Clean and Format Text Online',
        description: 'Step-by-step guide to cleaning raw unformatted text using MihirBuilds Text Cleaner.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Paste raw text',
            text: 'Paste or type your unformatted text into the input editor.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select cleaning and formatting rules',
            text: 'Choose from Whitespace, Characters, HTML tags, Letter case, Duplicates, Quotes, and Writing options.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Copy or chain results',
            text: 'Click Copy Result to copy your sanitized text or Apply as Input to perform sequential transformations.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mihirbuilds.com' },
          { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://www.mihirbuilds.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Text & Formatting', item: 'https://www.mihirbuilds.com/tools?category=text-tools' },
          { '@type': 'ListItem', position: 4, name: 'Clean Text & Formatting', item: 'https://www.mihirbuilds.com/tools/text-cleaner' },
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
