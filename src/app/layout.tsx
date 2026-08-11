import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MihirBuilds | WhatsApp, Email & Workflow Automation',
  description: 'MihirBuilds helps businesses automate WhatsApp, email, lead management and repetitive workflows with custom automation solutions.',
  metadataBase: new URL('https://www.mihirbuilds.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MihirBuilds | WhatsApp, Email & Workflow Automation',
    description: 'MihirBuilds helps businesses automate WhatsApp, email, lead management and repetitive workflows with custom automation solutions.',
    url: 'https://www.mihirbuilds.com',
    siteName: 'MihirBuilds',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1768796372362-05c256e61d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTg2MDA4NHww&ixlib=rb-4.1.0&q=80&w=1080',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MihirBuilds | WhatsApp, Email & Workflow Automation',
    description: 'MihirBuilds helps businesses automate WhatsApp, email, lead management and repetitive workflows with custom automation solutions.',
    images: ['https://images.unsplash.com/photo-1768796372362-05c256e61d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTg2MDA4NHww&ixlib=rb-4.1.0&q=80&w=1080'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <BottomNav />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
