import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getToolBySlug } from '@/data/tools';
import { ComingSoonTool } from '@/components/tools/ComingSoonTool';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Free Online Tools | MihirBuilds',
    };
  }

  return {
    title: `${tool.name} | Free Online Tools | MihirBuilds`,
    description: tool.description,
    alternates: {
      canonical: `https://www.mihirbuilds.com/tools/${slug}`,
    },
  };
}

export default async function ToolSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ComingSoonTool tool={tool} />;
}
