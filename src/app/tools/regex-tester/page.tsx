import { Metadata } from 'next';
import { RegexTesterTool } from '@/components/tools/RegexTesterTool';

export const metadata: Metadata = {
  title: 'Free Online Regex Tester & Debugger | MihirBuilds',
  description:
    'Test, debug, and validate regular expressions with real-time match highlighting, capturing group extraction, and regex presets. 100% browser-native execution.',
  keywords: [
    'regex tester',
    'regular expression tester',
    'regex debugger',
    'test regex online',
    'regex cheat sheet',
    'free developer tools',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/regex-tester',
  },
};

export default function RegexTesterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/regex-tester',
        name: 'Regex Tester & Debugger',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/regex-tester',
        description: 'Test and debug regular expressions with instant real-time matches.',
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
          { '@type': 'ListItem', position: 3, name: 'Regex Tester', item: 'https://www.mihirbuilds.com/tools/regex-tester' },
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
      <RegexTesterTool />
    </>
  );
}
