import { Metadata } from 'next';
import { JsonFormatterTool } from '@/components/tools/JsonFormatterTool';

export const metadata: Metadata = {
  title: 'Free Online JSON Formatter & Validator | Beautify, Minify & Fix JSON',
  description:
    'Best free online JSON Formatter, Validator & Beautifier. Inspect syntax errors, auto-repair trailing commas & single quotes, minify JSON, and explore interactive tree view 100% client-side.',
  keywords: [
    'json formatter',
    'json validator',
    'json beautifier',
    'json prettify',
    'minify json',
    'fix json errors',
    'json tree view',
    'json editor online',
    'free developer tools',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/json-formatter',
  },
  openGraph: {
    title: 'Free Online JSON Formatter & Validator | MihirBuilds',
    description:
      'Beautify, validate, minify, and automatically repair JSON payloads with zero latency and complete client privacy.',
    url: 'https://www.mihirbuilds.com/tools/json-formatter',
    siteName: 'MihirBuilds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online JSON Formatter & Validator | MihirBuilds',
    description:
      'Format, validate, beautify, and repair JSON online. 100% client-side privacy.',
  },
};

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/json-formatter',
        name: 'JSON Formatter & Validator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/json-formatter',
        description:
          'Free browser-native JSON Formatter, Validator, Beautifier, and syntax fixer with interactive tree view and metrics.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          'JSON Beautifier with 2 spaces, 4 spaces, and tabs',
          'JSON Minification / Compaction',
          'Automatic error repair for trailing commas and single quotes',
          'Interactive hierarchical Tree View',
          'Real-time syntax validation with line number error pointers',
          '100% Client-Side Private Processing',
        ],
        author: {
          '@type': 'Organization',
          name: 'MihirBuilds',
          url: 'https://www.mihirbuilds.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.mihirbuilds.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://www.mihirbuilds.com/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Developer Tools',
            item: 'https://www.mihirbuilds.com/tools?category=developer-tools',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'JSON Formatter & Validator',
            item: 'https://www.mihirbuilds.com/tools/json-formatter',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Format and Validate JSON Online',
        description: 'Step-by-step guide to format, validate, and repair JSON payloads.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Step 1: Paste or Upload JSON',
            text: 'Paste raw JSON data directly into the online editor or upload a .json file from your computer.',
            url: 'https://www.mihirbuilds.com/tools/json-formatter#step1',
          },
          {
            '@type': 'HowToStep',
            name: 'Step 2: Format or Auto-Repair',
            text: 'Click Format / Beautify to indent the payload, or click Auto-Fix Errors to automatically remove trailing commas and fix quotes.',
            url: 'https://www.mihirbuilds.com/tools/json-formatter#step2',
          },
          {
            '@type': 'HowToStep',
            name: 'Step 3: Copy or Download',
            text: 'Copy the clean formatted JSON to your clipboard or download it as a .json file.',
            url: 'https://www.mihirbuilds.com/tools/json-formatter#step3',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is JSON and why should you format it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'JSON (JavaScript Object Notation) is the standard data format for APIs and web services. Formatting adds structured indentation and line breaks, making large minified payloads readable for developers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data transmitted or logged on any server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All validation, formatting, minifying, and tree-rendering executes 100% locally in your browser with zero remote server requests, protecting sensitive tokens and customer information.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the Auto-Fix Common Errors feature work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The auto-repair engine intelligently corrects trailing commas, single quotes, unquoted keys, and JavaScript comments to convert broken input into valid RFC 8259 compliant JSON.',
            },
          },
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
      <JsonFormatterTool />
    </>
  );
}
