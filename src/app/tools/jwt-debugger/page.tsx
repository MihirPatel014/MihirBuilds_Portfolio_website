import { Metadata } from 'next';
import { JwtDebuggerTool } from '@/components/tools/JwtDebuggerTool';

export const metadata: Metadata = {
  title: 'Free Online JWT Token Debugger & Decoder | MihirBuilds',
  description:
    'Decode, verify, and inspect JSON Web Tokens (JWT) headers and payloads without exposing secret keys. 100% client-side privacy, token expiration checker, and claims inspector.',
  keywords: [
    'jwt debugger',
    'jwt decoder',
    'decode jwt online',
    'jwt token inspector',
    'json web token',
    'free developer tools',
    'jwt expiration checker',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/jwt-debugger',
  },
};

export default function JwtDebuggerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/jwt-debugger',
        name: 'JWT Token Debugger',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/jwt-debugger',
        description: 'Decode and inspect JSON Web Tokens in real time with client-side security.',
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
          { '@type': 'ListItem', position: 3, name: 'JWT Debugger', item: 'https://www.mihirbuilds.com/tools/jwt-debugger' },
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
      <JwtDebuggerTool />
    </>
  );
}
