import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import { Providers } from './providers';
import Preferences from '../components/Preferences';
import ChatBot from '../components/ChatBot';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AirNap T4 | Transit Hotel Madrid Barajas',
  description: 'Descanso premium en la Terminal 4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <Providers>
          {children}
          <Preferences />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
