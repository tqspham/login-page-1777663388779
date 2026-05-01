import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
