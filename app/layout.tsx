import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitMetrics - GitHub Analytics Platform',
  description: 'Modern analytics platform for GitHub profiles and repositories',
  authors: [{ name: 'hari7261', url: 'https://github.com/hari7261' }],
  creator: 'hari7261',
  publisher: 'hari7261',
  keywords: ['github', 'analytics', 'metrics', 'repositories', 'developers', 'git', 'stats', 'profile'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gitmetrics.vercel.app',
    title: 'GitMetrics - GitHub Analytics Platform',
    description: 'Modern analytics platform for GitHub profiles and repositories',
    siteName: 'GitMetrics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitMetrics - GitHub Analytics Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitMetrics - GitHub Analytics Platform',
    description: 'Modern analytics platform for GitHub profiles and repositories',
    images: ['/twitter-image.png'],
    creator: '@hari7261',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon-16x16.svg',
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}