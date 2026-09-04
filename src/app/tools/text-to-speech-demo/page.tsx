import { Metadata } from 'next';
import { TextToSpeechTool } from '@/components/tools/TextToSpeechTool';

export const metadata: Metadata = {
  title: 'Free Text to Speech Demo | Natural Voice AI Reader Online',
  description:
    'Free online text to speech converter. Convert written scripts into natural sounding human voices directly in your browser with custom pitch, speed, and accents.',
  keywords: [
    'text to speech demo',
    'tts online free',
    'voice synthesizer',
    'free speech reader',
    'natural sounding voice generator',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/text-to-speech-demo',
  },
};

export default function TextToSpeechPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/text-to-speech-demo',
        name: 'Text to Speech Voice Demo Online',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/text-to-speech-demo',
        description: 'Convert text to natural-sounding human speech in real-time.',
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
          { '@type': 'ListItem', position: 4, name: 'Text to Speech', item: 'https://www.mihirbuilds.com/tools/text-to-speech-demo' },
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
      <TextToSpeechTool />
    </>
  );
}
