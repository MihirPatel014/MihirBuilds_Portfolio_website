export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  count: number;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  iconName: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  badge?: string;
  tags: string[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    iconName: 'Code2',
    description: 'Format, validate, debug, and convert code, data formats, and API payloads.',
    count: 6,
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    iconName: 'FileText',
    description: 'Merge, split, compress, and convert PDF documents in your browser.',
    count: 4,
  },
  {
    id: 'text-tools',
    name: 'Text & Formatting',
    slug: 'text-tools',
    iconName: 'Type',
    description: 'Word counters, slug generators, case converters, and markdown formatters.',
    count: 2,
  },
  {
    id: 'seo-tools',
    name: 'SEO & Web Tools',
    slug: 'seo-tools',
    iconName: 'Globe',
    description: 'Meta tag generators, schema builders, and robots.txt testers.',
    count: 2,
  },
  {
    id: 'whatsapp-tools',
    name: 'WhatsApp Utilities',
    slug: 'whatsapp-tools',
    iconName: 'MessageSquare',
    description: 'Direct WhatsApp link generator, message formatters, and QR code creators.',
    count: 1,
  },
];

export const TOOLS: ToolItem[] = [
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    href: '/tools/json-formatter',
    description: 'Format, beautify, minify, validate, and repair JSON data with real-time error detection and interactive tree view.',
    shortDescription: 'Beautify, validate, minify, and fix JSON syntax errors instantly.',
    categoryId: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'FileCode2',
    isPopular: true,
    isFeatured: true,
    badge: 'Popular',
    tags: ['json', 'formatter', 'validator', 'prettify', 'minify', 'developer', 'syntax error', 'tree view', 'beautifier'],
  },
  {
    id: 'base64-converter',
    name: 'Base64 Encoder / Decoder',
    slug: 'base64-converter',
    href: '/tools/base64-converter',
    description: 'Encode and decode plain text, binary strings, and image files to and from Base64 format securely.',
    shortDescription: 'Encode & decode strings and files to Base64 in real-time.',
    categoryId: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Binary',
    isPopular: true,
    badge: 'Popular',
    tags: ['base64', 'encode', 'decode', 'developer', 'string', 'binary', 'data url'],
  },
  {
    id: 'jwt-debugger',
    name: 'JWT Token Debugger',
    slug: 'jwt-debugger',
    href: '/tools/jwt-debugger',
    description: 'Decode, inspect, and verify JSON Web Tokens (JWT) headers and payloads without transmitting data.',
    shortDescription: 'Decode and inspect JWT headers, claims, and expiration.',
    categoryId: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'KeyRound',
    isNew: true,
    badge: 'New',
    tags: ['jwt', 'token', 'auth', 'developer', 'json', 'jwt decoder', 'claims'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Query Formatter',
    slug: 'sql-formatter',
    href: '/tools/sql-formatter',
    description: 'Beautify and indent complex SQL queries with syntax highlighting for PostgreSQL, MySQL, and SQLite.',
    shortDescription: 'Format and prettify SQL queries for clean database scripts.',
    categoryId: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Database',
    tags: ['sql', 'database', 'format', 'developer', 'query', 'sql beautifier', 'postgres', 'mysql'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester & Explainer',
    slug: 'regex-tester',
    href: '/tools/regex-tester',
    description: 'Test regular expressions against sample text with live match highlighting, group extraction, and presets.',
    shortDescription: 'Test and debug regex patterns with instant match results.',
    categoryId: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'SearchCode',
    tags: ['regex', 'pattern', 'test', 'developer', 'regular expression', 'regex tester'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID / GUID Generator',
    slug: 'uuid-generator',
    href: '/tools/uuid-generator',
    description: 'Generate secure, cryptographically random v4 and v7 UUIDs in bulk with customizable casing and formatting.',
    shortDescription: 'Generate batch v4/v7 UUIDs and GUIDs instantly.',
    categoryId: 'developer-tools',
    categoryName: 'Developer Tools',
    iconName: 'Hash',
    tags: ['uuid', 'guid', 'generator', 'developer', 'random', 'v4', 'v7', 'uuid v4'],
  },

  // PDF Tools
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    slug: 'compress-pdf',
    href: '/tools/json-formatter',
    description: 'Reduce PDF file size while maintaining maximum image and text quality directly in the browser.',
    shortDescription: 'Shrink PDF file size quickly without losing clarity.',
    categoryId: 'pdf-tools',
    categoryName: 'PDF Tools',
    iconName: 'Minimize2',
    isPopular: true,
    badge: 'Popular',
    tags: ['pdf', 'compress', 'optimize', 'shrink'],
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    slug: 'merge-pdf',
    href: '/tools/json-formatter',
    description: 'Combine multiple PDF files into one clean document with custom page reordering.',
    shortDescription: 'Combine multiple PDFs into a single organized document.',
    categoryId: 'pdf-tools',
    categoryName: 'PDF Tools',
    iconName: 'Layers',
    isPopular: true,
    tags: ['pdf', 'merge', 'combine', 'join'],
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    slug: 'split-pdf',
    href: '/tools/json-formatter',
    description: 'Split PDF files by specific page ranges or extract each page into individual files.',
    shortDescription: 'Extract specific pages or split large PDF files.',
    categoryId: 'pdf-tools',
    categoryName: 'PDF Tools',
    iconName: 'Scissors',
    tags: ['pdf', 'split', 'extract', 'pages'],
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG / PNG',
    slug: 'pdf-to-jpg',
    href: '/tools/json-formatter',
    description: 'Convert PDF pages into high-resolution JPG or PNG image files with zero compression artifacts.',
    shortDescription: 'Convert PDF pages to high-quality images.',
    categoryId: 'pdf-tools',
    categoryName: 'PDF Tools',
    iconName: 'Image',
    tags: ['pdf', 'jpg', 'png', 'convert', 'image'],
  },

  // Text & Formatting
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    slug: 'word-counter',
    href: '/tools/json-formatter',
    description: 'Accurate real-time word, character, sentence, paragraph, and reading time counter.',
    shortDescription: 'Count words, characters, sentences, and estimated reading time.',
    categoryId: 'text-tools',
    categoryName: 'Text & Formatting',
    iconName: 'FileSpreadsheet',
    tags: ['word counter', 'text', 'character counter', 'reading time'],
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    slug: 'case-converter',
    href: '/tools/json-formatter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    shortDescription: 'Transform text case to camelCase, snake_case, uppercase & more.',
    categoryId: 'text-tools',
    categoryName: 'Text & Formatting',
    iconName: 'Baseline',
    tags: ['case converter', 'text', 'camelCase', 'snake_case'],
  },

  // SEO & Web Tools
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    href: '/tools/json-formatter',
    description: 'Generate high-ranking Google, Open Graph, and Twitter card meta tags for websites.',
    shortDescription: 'Generate SEO meta tags, OpenGraph, and Twitter cards.',
    categoryId: 'seo-tools',
    categoryName: 'SEO & Web Tools',
    iconName: 'Sparkles',
    isPopular: true,
    tags: ['seo', 'meta tags', 'opengraph', 'twitter card', 'google'],
  },
  {
    id: 'schema-generator',
    name: 'Schema JSON-LD Builder',
    slug: 'schema-generator',
    href: '/tools/json-formatter',
    description: 'Create Google-compliant structured data for FAQ, Article, Organization, and Software.',
    shortDescription: 'Build structured data JSON-LD schemas for rich search results.',
    categoryId: 'seo-tools',
    categoryName: 'SEO & Web Tools',
    iconName: 'Code',
    tags: ['schema', 'json-ld', 'seo', 'structured data', 'faq schema'],
  },

  // WhatsApp Utilities
  {
    id: 'whatsapp-link-generator',
    name: 'WhatsApp Direct Link Generator',
    slug: 'whatsapp-link-generator',
    href: '/tools/json-formatter',
    description: 'Create direct click-to-chat WhatsApp links with pre-filled custom messages for sales and support.',
    shortDescription: 'Create instant click-to-chat WhatsApp links with custom text.',
    categoryId: 'whatsapp-tools',
    categoryName: 'WhatsApp Utilities',
    iconName: 'MessageSquare',
    isPopular: true,
    badge: 'Popular',
    tags: ['whatsapp', 'link generator', 'click to chat', 'automation', 'chat link'],
  },
];

export function getAllTools(): ToolItem[] {
  return TOOLS;
}

export function getPopularTools(): ToolItem[] {
  return TOOLS.filter((tool) => tool.isPopular);
}

export function getToolsByCategory(categoryId: string): ToolItem[] {
  return TOOLS.filter((tool) => tool.categoryId === categoryId);
}

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}
