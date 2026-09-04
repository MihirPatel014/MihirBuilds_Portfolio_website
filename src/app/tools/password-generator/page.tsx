import { Metadata } from 'next';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';

export const metadata: Metadata = {
  title: 'Free Password Generator | Strong Random Password Maker | MihirBuilds',
  description:
    'Free online password generator. Generate ultra-secure, cryptographically random passwords with custom lengths, uppercase/lowercase letters, digits, symbols, and no confusing characters.',
  keywords: [
    'password generator',
    'random password generator',
    'secure password generator',
    'strong password maker',
    'generate password online',
    'crypto password generator',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/password-generator',
  },
};

export default function PasswordGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/password-generator',
        name: 'Secure Password Generator Online',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/password-generator',
        description:
          'Free online tool to generate strong, cryptographically secure passwords locally in your web browser.',
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
          { '@type': 'ListItem', position: 4, name: 'Password Generator', item: 'https://www.mihirbuilds.com/tools/password-generator' },
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
      <PasswordGeneratorTool />
    </>
  );
}
