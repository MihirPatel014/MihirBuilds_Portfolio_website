import { Metadata } from 'next';
import { UuidGeneratorTool } from '@/components/tools/UuidGeneratorTool';

export const metadata: Metadata = {
  title: 'Free Online UUID / GUID Bulk Generator (v4 & v7) | MihirBuilds',
  description:
    'Generate cryptographically random UUID v4 and time-sortable UUID v7 in bulk online. Customize uppercase, braces, and hyphens. 100% browser-native execution using Web Crypto API.',
  keywords: [
    'uuid generator',
    'guid generator',
    'uuid v4',
    'uuid v7',
    'bulk uuid generator',
    'free developer tools',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/uuid-generator',
  },
};

export default function UuidGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/uuid-generator',
        name: 'UUID / GUID Bulk Generator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/uuid-generator',
        description: 'Generate batch v4 and v7 UUIDs and GUIDs instantly.',
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
          { '@type': 'ListItem', position: 3, name: 'UUID Generator', item: 'https://www.mihirbuilds.com/tools/uuid-generator' },
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
      <UuidGeneratorTool />
    </>
  );
}
