import { Metadata } from 'next';
import { SqlFormatterTool } from '@/components/tools/SqlFormatterTool';

export const metadata: Metadata = {
  title: 'Free Online SQL Query Formatter & Beautifier | MihirBuilds',
  description:
    'Beautify, indent, and format messy SQL queries online. Supports PostgreSQL, MySQL, SQLite, T-SQL with keyword capitalization and minification. 100% browser execution.',
  keywords: [
    'sql formatter',
    'sql beautifier',
    'format sql online',
    'sql prettify',
    'mysql formatter',
    'postgres formatter',
    'free developer tools',
  ],
  alternates: {
    canonical: 'https://www.mihirbuilds.com/tools/sql-formatter',
  },
};

export default function SqlFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.mihirbuilds.com/tools/sql-formatter',
        name: 'SQL Query Formatter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any (Web Browser)',
        url: 'https://www.mihirbuilds.com/tools/sql-formatter',
        description: 'Format, beautify, and indent SQL queries in your web browser.',
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
          { '@type': 'ListItem', position: 3, name: 'SQL Formatter', item: 'https://www.mihirbuilds.com/tools/sql-formatter' },
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
      <SqlFormatterTool />
    </>
  );
}
