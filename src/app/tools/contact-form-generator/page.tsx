import { Metadata } from 'next';
import { ContactFormGeneratorTool } from '@/components/tools/ContactFormGeneratorTool';

export const metadata: Metadata = {
  title: 'Free Contact Form Generator | Create HTML Contact Forms Online',
  description:
    'Free online contact form generator. Create responsive HTML/CSS contact forms with custom fields, validation, and ready-to-paste embed code. Compatible with WordPress, Webflow, and Shopify.',
  keywords: [
    'contact form generator',
    'free contact form maker',
    'html contact form',
    'responsive form builder',
    'embed contact form html',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/contact-form-generator',
  },
};

export default function ContactFormGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/contact-form-generator',
        name: 'Contact Form Generator Online',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/contact-form-generator',
        description: 'Build custom responsive HTML contact forms with custom validation and styling.',
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
          { '@type': 'ListItem', position: 4, name: 'Contact Form Generator', item: 'https://www.mihirbuilds.com/tools/contact-form-generator' },
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
      <ContactFormGeneratorTool />
    </>
  );
}
