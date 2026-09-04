import { Metadata } from 'next';
import { TermsConditionsTool } from '@/components/tools/TermsConditionsTool';

export const metadata: Metadata = {
  title: 'Free Terms and Conditions Generator | Terms of Service Maker',
  description:
    'Generate free, legally binding terms and conditions, terms of service, and user agreements for websites, mobile apps, and SaaS businesses. Customizable clauses and jurisdiction.',
  keywords: [
    'terms and conditions generator',
    'free terms of service maker',
    'terms of use generator',
    'website terms template',
    'generate terms and conditions online',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/terms-conditions-generator',
  },
};

export default function TermsConditionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/terms-conditions-generator',
        name: 'Terms and Conditions Generator Online',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/terms-conditions-generator',
        description: 'Generate legally binding terms of service and user agreements for websites and applications.',
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
          { '@type': 'ListItem', position: 4, name: 'Terms & Conditions Generator', item: 'https://www.mihirbuilds.com/tools/terms-conditions-generator' },
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
      <TermsConditionsTool />
    </>
  );
}
