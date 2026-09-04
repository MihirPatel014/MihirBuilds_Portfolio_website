import { Metadata } from 'next';
import { PrivacyPolicyTool } from '@/components/tools/PrivacyPolicyTool';

export const metadata: Metadata = {
  title: 'Free Privacy Policy Generator | GDPR & CCPA Compliant Policy Maker',
  description:
    'Generate a free, legally compliant privacy policy for websites, mobile applications, SaaS, and ecommerce stores with GDPR, CCPA, cookies, and Google Analytics disclosures.',
  keywords: [
    'privacy policy generator',
    'free privacy policy maker',
    'gdpr privacy policy',
    'ccpa compliant policy',
    'website privacy policy template',
    'generate privacy policy online',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/privacy-policy-generator',
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/privacy-policy-generator',
        name: 'Privacy Policy Generator Online',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/privacy-policy-generator',
        description: 'Generate customized GDPR and CCPA compliant privacy policies for websites and apps.',
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
          { '@type': 'ListItem', position: 4, name: 'Privacy Policy Generator', item: 'https://www.mihirbuilds.com/tools/privacy-policy-generator' },
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
      <PrivacyPolicyTool />
    </>
  );
}
