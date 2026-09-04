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
    id: 'utilities',
    name: 'Utilities',
    slug: 'utilities',
    iconName: 'Wrench',
    description: 'QR code generator, password maker, form builders, widgets, and handy digital utilities.',
    count: 8,
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    iconName: 'Code2',
    description: 'Format, validate, debug, and convert code, data formats, and API payloads.',
    count: 6,
  },
  {
    id: 'text-tools',
    name: 'Text & Formatting',
    slug: 'text-tools',
    iconName: 'Type',
    description: 'Word counters, case converters, text cleaners, HTML strippers, and string utilities.',
    count: 3,
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
  // Utilities
  {
    id: 'qr-code',
    name: 'QR Code Generator Free',
    slug: 'qr-code',
    href: '/tools/qr-code',
    description: 'Create custom QR codes for URLs, WiFi passwords, vCard contacts, WhatsApp, and UPI payments with custom colors, size, error correction, and PNG/SVG download.',
    shortDescription: 'Create custom QR codes for URLs, WiFi, contacts, WhatsApp & UPI.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'QrCode',
    isPopular: true,
    isFeatured: true,
    isNew: true,
    badge: 'Popular',
    tags: ['qr code', 'qr code generator', 'custom qr', 'wifi qr', 'vcard qr', 'whatsapp qr', 'upi payment', 'svg qr', 'png qr', 'utilities'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    slug: 'password-generator',
    href: '/tools/password-generator',
    description: 'Generate ultra-secure, cryptographically random passwords with customizable length, symbols, digits, and phonetic readability.',
    shortDescription: 'Generate strong, secure passwords with custom length & character options.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'Shield',
    isPopular: true,
    tags: ['password generator', 'security', 'random password', 'utilities', 'crypto'],
  },
  {
    id: 'contact-form-generator',
    name: 'Contact Form Generator',
    slug: 'contact-form-generator',
    href: '/tools/contact-form-generator',
    description: 'Create beautiful responsive HTML/CSS contact forms with validation, custom field builder, and clean copy-paste markup.',
    shortDescription: 'Build beautiful contact forms with custom fields & ready-to-use HTML/CSS.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'LayoutTemplate',
    tags: ['contact form', 'form generator', 'html form', 'css form', 'utilities'],
  },
  {
    id: 'whatsapp-widget-generator',
    name: 'WhatsApp Widget Generator',
    slug: 'whatsapp-widget-generator',
    href: '/tools/whatsapp-widget-generator',
    description: 'Generate floating click-to-chat WhatsApp button widgets for websites with custom branding, welcome message, and avatar.',
    shortDescription: 'Add a floating WhatsApp chat button to your website with custom colors & messages.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'MessageCircle',
    tags: ['whatsapp widget', 'floating chat', 'click to chat', 'utilities', 'website widget'],
  },
  {
    id: 'privacy-policy-generator',
    name: 'Privacy Policy Generator',
    slug: 'privacy-policy-generator',
    href: '/tools/privacy-policy-generator',
    description: 'Generate customized privacy policies compliant with GDPR, CCPA, and Google AdSense for websites and mobile applications.',
    shortDescription: 'Generate custom privacy policies with GDPR and CCPA compliance options.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'FileCheck',
    tags: ['privacy policy', 'gdpr', 'ccpa', 'legal', 'utilities', 'compliance'],
  },
  {
    id: 'terms-conditions-generator',
    name: 'Terms & Conditions Generator',
    slug: 'terms-conditions-generator',
    href: '/tools/terms-conditions-generator',
    description: 'Create legally sound terms of service and user agreements customized for your SaaS, ecommerce store, or digital service.',
    shortDescription: 'Generate comprehensive terms & conditions for websites and apps.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'FileText',
    tags: ['terms and conditions', 'terms of service', 'legal', 'utilities'],
  },
  {
    id: 'text-to-speech-demo',
    name: 'Text to Speech Demo',
    slug: 'text-to-speech-demo',
    href: '/tools/text-to-speech-demo',
    description: 'Synthesize written text into lifelike natural-sounding human speech in real-time with adjustable pitch, speed, and accents.',
    shortDescription: 'Convert text to natural-sounding speech with live browser preview.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'Volume2',
    tags: ['text to speech', 'tts', 'audio voice', 'utilities', 'speech synthesis'],
  },
  {
    id: 'email-signature-generator',
    name: 'Email Signature Generator',
    slug: 'email-signature-generator',
    href: '/tools/email-signature-generator',
    description: 'Design sleek professional HTML email signatures for Gmail, Outlook, and Apple Mail with social icons and banners.',
    shortDescription: 'Create professional HTML email signatures for Gmail, Outlook & Apple Mail.',
    categoryId: 'utilities',
    categoryName: 'Utilities',
    iconName: 'Mail',
    tags: ['email signature', 'html email signature', 'gmail signature', 'outlook', 'utilities'],
  },

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

  // Text & Formatting
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    slug: 'word-counter',
    href: '/tools/word-counter',
    description: 'Real-time word, character, sentence, paragraph, syllable, reading time, and keyword density counter.',
    shortDescription: 'Count words, characters, sentences, and estimated reading time.',
    categoryId: 'text-tools',
    categoryName: 'Text & Formatting',
    iconName: 'FileSpreadsheet',
    isPopular: true,
    badge: 'Popular',
    tags: ['word counter', 'text', 'character counter', 'reading time', 'speaking time', 'density'],
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    slug: 'case-converter',
    href: '/tools/case-converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.',
    shortDescription: 'Transform text case to camelCase, snake_case, uppercase & more.',
    categoryId: 'text-tools',
    categoryName: 'Text & Formatting',
    iconName: 'Baseline',
    isPopular: true,
    tags: ['case converter', 'text', 'camelCase', 'snake_case', 'title case', 'sentence case'],
  },
  {
    id: 'text-cleaner',
    name: 'Text Cleaner & Formatter',
    slug: 'text-cleaner',
    href: '/tools/text-cleaner',
    description: 'Remove duplicate spaces, strip line breaks, remove duplicate lines, strip HTML tags, remove numbers/emojis, and find-replace.',
    shortDescription: 'Clean whitespace, remove empty lines, strip HTML & format text.',
    categoryId: 'text-tools',
    categoryName: 'Text & Formatting',
    iconName: 'Sparkles',
    isNew: true,
    badge: 'New',
    tags: ['text cleaner', 'remove spaces', 'remove line breaks', 'strip html', 'remove duplicate lines', 'find replace'],
  },

  // PDF Tools (Mapped to dynamic fallback page)
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    slug: 'compress-pdf',
    href: '/tools/compress-pdf',
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
    href: '/tools/merge-pdf',
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
    href: '/tools/split-pdf',
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
    href: '/tools/pdf-to-jpg',
    description: 'Convert PDF pages into high-resolution JPG or PNG image files with zero compression artifacts.',
    shortDescription: 'Convert PDF pages to high-quality images.',
    categoryId: 'pdf-tools',
    categoryName: 'PDF Tools',
    iconName: 'Image',
    tags: ['pdf', 'jpg', 'png', 'convert', 'image'],
  },

  // SEO & Web Tools
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    href: '/tools/meta-tag-generator',
    description: 'Generate high-ranking Google, Open Graph, and Twitter card meta tags for websites.',
    shortDescription: 'Generate SEO meta tags, OpenGraph, and Twitter cards.',
    categoryId: 'seo-tools',
    categoryName: 'SEO & Web Tools',
    iconName: 'Globe',
    isPopular: true,
    tags: ['seo', 'meta tags', 'opengraph', 'twitter card', 'google'],
  },
  {
    id: 'schema-generator',
    name: 'Schema JSON-LD Builder',
    slug: 'schema-generator',
    href: '/tools/schema-generator',
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
    href: '/tools/whatsapp-link-generator',
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
