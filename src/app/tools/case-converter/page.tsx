import { Metadata } from 'next';
import { CaseConverterTool } from '@/components/tools/CaseConverterTool';

export const metadata: Metadata = {
  title: 'Free Online Case Converter | Title Case, camelCase, UPPERCASE & snake_case',
  description:
    'Convert text case online instantly. Transform between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. 100% free.',
  keywords: [
    'case converter',
    'convert case',
    'title case converter',
    'camelcase converter',
    'snake case converter',
    'kebab case converter',
    'uppercase to lowercase',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/case-converter',
  },
};

export default function CaseConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/case-converter',
        name: 'Case Converter & Text Transformer',
        applicationCategory: 'TextEditor',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/case-converter',
        description: 'Transform text case to camelCase, snake_case, uppercase and Title Case.',
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
          { '@type': 'ListItem', position: 3, name: 'Case Converter', item: 'https://www.mihirbuilds.com/tools/case-converter' },
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
      <CaseConverterTool />
    </>
  );
}
