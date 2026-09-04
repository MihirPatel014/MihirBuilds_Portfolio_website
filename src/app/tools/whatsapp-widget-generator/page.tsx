import { Metadata } from 'next';
import { WhatsAppWidgetTool } from '@/components/tools/WhatsAppWidgetTool';

export const metadata: Metadata = {
  title: 'Free WhatsApp Widget Generator | Floating Chat Button for Website',
  description:
    'Generate a free, lightweight floating WhatsApp chat widget for any website. Customize button position, colors, brand messages, pre-filled text, and copy ready-to-paste HTML code.',
  keywords: [
    'whatsapp widget generator',
    'whatsapp chat button',
    'floating whatsapp button',
    'click to chat whatsapp widget',
    'website whatsapp widget',
    'free whatsapp button html',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/whatsapp-widget-generator',
  },
};

export default function WhatsAppWidgetPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/whatsapp-widget-generator',
        name: 'WhatsApp Floating Widget Generator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/whatsapp-widget-generator',
        description: 'Generate lightweight floating WhatsApp chat buttons for websites with custom branding.',
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
          { '@type': 'ListItem', position: 4, name: 'WhatsApp Widget', item: 'https://www.mihirbuilds.com/tools/whatsapp-widget-generator' },
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
      <WhatsAppWidgetTool />
    </>
  );
}
