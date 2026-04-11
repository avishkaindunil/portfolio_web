import type { Metadata } from 'next';
import { Cormorant_Garamond, Syne } from 'next/font/google';
import './globals.css';
import ThemeProvider from './_components/ThemeProvider';
import Nav           from './_components/Nav';
import CustomCursor  from './_components/CustomCursor';
import ClientShell   from './_components/ClientShell';

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300','400','500','600'],
  style:    ['normal','italic'],
  variable: '--font-serif',
  display:  'swap',
  preload:  true,
});
const syne = Syne({
  subsets:  ['latin'],
  weight:   ['400','500','600','700'],
  variable: '--font-sans',
  display:  'swap',
  preload:  true,
});

export const metadata: Metadata = {
  title:       'Avishka Indunil — Software Engineer',
  description: 'Software Engineer based in Colombo, Sri Lanka. Java · Spring Boot · React.',
  keywords:    ['Software Engineer','Java','Spring Boot','React','Colombo','Sri Lanka'],
  openGraph: {
    title:       'Avishka Indunil — Software Engineer',
    description: 'Building scalable web & mobile solutions.',
    type:        'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${syne.variable}`}>
        <ThemeProvider>
          <div className="noise" aria-hidden />
          <CustomCursor />
          <ClientShell>
            <Nav />
            {children}
          </ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
