import { Metadata } from 'next';
import { Base64Tool } from '@/components/tools/Base64Tool';

export const metadata: Metadata = {
  title: 'Free Online Base64 Encoder / Decoder | MihirBuilds',
  description:
    'Fast, secure, and free online Base64 encoder and decoder. Convert text, UTF-8 strings, and files to and from Base64 with URL-safe RFC 4648 support. 100% browser execution.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 convert',
    'url safe base64',
    'base64 image encoder',
    'free developer tools',
    'string to base64',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/base64-converter',
  },
};

export default function Base64Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/base64-converter',
        name: 'Base64 Encoder / Decoder',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/base64-converter',
        description: 'Encode and decode plain text and files to Base64 in real-time with URL-safe formatting.',
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
          { '@type': 'ListItem', position: 3, name: 'Base64 Encoder / Decoder', item: 'https://www.mihirbuilds.com/tools/base64-converter' },
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
      <Base64Tool />
    </>
  );
}
