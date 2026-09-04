import { Metadata } from 'next';
import { EmailSignatureTool } from '@/components/tools/EmailSignatureTool';

export const metadata: Metadata = {
  title: 'Free HTML Email Signature Generator | Gmail, Outlook & Apple Mail',
  description:
    'Design professional HTML email signatures for Gmail, Outlook, Apple Mail, and Yahoo. Customize company logo, phone, website, and social links with 1-click HTML copy.',
  keywords: [
    'email signature generator',
    'html email signature',
    'free email signature maker',
    'gmail email signature',
    'outlook email signature',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/email-signature-generator',
  },
};

export default function EmailSignaturePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/email-signature-generator',
        name: 'Professional Email Signature Generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/email-signature-generator',
        description: 'Create professional HTML email signatures for Gmail, Outlook, and Apple Mail.',
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
          { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://www.mihirbuilds.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Utilities', item: 'https://www.mihirbuilds.com/tools?category=utilities' },
          { '@type': 'ListItem', position: 4, name: 'Email Signature Generator', item: 'https://www.mihirbuilds.com/tools/email-signature-generator' },
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
      <EmailSignatureTool />
    </>
  );
}
