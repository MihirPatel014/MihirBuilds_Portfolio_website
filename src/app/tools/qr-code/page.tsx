import { Metadata } from 'next';
import { QrCodeTool } from '@/components/tools/QrCodeTool';

export const metadata: Metadata = {
  title: 'Free QR Code Generator | Create Custom QR Codes Online (PNG & SVG)',
  description:
    'Free online QR code generator. Create custom QR codes for URLs, WiFi networks, vCard contacts, WhatsApp chats, and UPI payments. Custom colors, sizes up to 1024px, error correction, and instant PNG/SVG vector download with no watermarks.',
  keywords: [
    'qr code generator',
    'free qr code generator',
    'custom qr code maker',
    'wifi qr code',
    'vcard qr code generator',
    'whatsapp qr code',
    'upi payment qr code',
    'qr code png download',
    'qr code svg download',
    'qr code generator no signup',
    'no watermark qr code',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/qr-code',
  },
  openGraph: {
    title: 'Free QR Code Generator Online | Custom QR Code Maker | MihirBuilds',
    description:
      'Create high-resolution custom QR codes for URLs, WiFi, contacts, WhatsApp, and UPI payments. Download in PNG or SVG for free.',
    url: 'https://www.mihirbuilds.com/tools/qr-code',
    siteName: 'MihirBuilds',
    type: 'website',
  },
};

export default function QrCodePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/qr-code',
        name: 'Free QR Code Generator Online',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/qr-code',
        description:
          'Create custom QR codes for URLs, WiFi passwords, vCards, WhatsApp chat, and UPI payments with custom colors, size, error correction, and vector SVG/PNG download.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Free Custom QR Code',
        description: 'Create and download a custom branded QR code for free in 3 easy steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select QR Code Type',
            text: 'Choose between URL, Plain Text, WiFi Network, vCard Contact, WhatsApp, or UPI Payment.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Information & Customize',
            text: 'Input your target data and customize colors, resolution, and error correction level.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download PNG or Vector SVG',
            text: 'Download your high-resolution PNG for digital use or scalable SVG for professional print.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mihirbuilds.com' },
          { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://www.mihirbuilds.com/tools' },
          { '@type': 'ListItem', position: 3, name: 'Utilities', item: 'https://www.mihirbuilds.com/tools?category=utilities' },
          { '@type': 'ListItem', position: 4, name: 'QR Code Generator', item: 'https://www.mihirbuilds.com/tools/qr-code' },
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
      <QrCodeTool />
    </>
  );
}
