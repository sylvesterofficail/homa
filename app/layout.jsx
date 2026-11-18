import localFont from 'next/font/local';
import Script from 'next/script';
import Providers from '@/components/Providers';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';
import './legacy.css';
import './site.css';
import { BASE } from '@/lib/asset';

const display = localFont({
  src: [
    { path: './fonts/bodoni-moda-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/bodoni-moda-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/bodoni-moda-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/bodoni-moda-latin-500-italic.woff2', weight: '500', style: 'italic' },
    { path: './fonts/bodoni-moda-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/bodoni-moda-latin-600-italic.woff2', weight: '600', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const sans = localFont({
  src: [
    { path: './fonts/plus-jakarta-sans-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/plus-jakarta-sans-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/plus-jakarta-sans-latin-600-normal.woff2', weight: '600' },
    { path: './fonts/plus-jakarta-sans-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Victory Homa Obuzor — HR, Communications & Brand Strategy',
  description:
    'Portfolio of Victory Homa Obuzor: Human Resource Management graduate working across HR, corporate communications and brand strategy in Abuja, Nigeria.',
  icons: { icon: `${BASE}/favicon.svg` },
};

export const viewport = { themeColor: '#222c20' };

// Set the theme before paint so dark mode never flashes light.
const themeBoot = `try{var t=localStorage.getItem('victory_homa_theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* Interactive layer: dossiers, CV reader, career vault, archive, calculator */}
        <Script src={`${BASE}/legacy/script.js`} strategy="afterInteractive" />
      </body>
    </html>
  );
}
