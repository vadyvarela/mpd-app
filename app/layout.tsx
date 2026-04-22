import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'MpD — Movimento para Democracia Cabo Verde',
  description: 'O Movimento para a Democracia, conhecido também pela sigla MpD, é um partido político de centro-direita de Cabo Verde. Esteve no poder entre 1991 e 2001. Os seus membros têm como alcunha "os ventoinhas", por causa do emblema do partido que faz lembrar uma ventoinha, e identificam-se com a cor verde.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MpD',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
        <Toaster position="top-center" expand={false} richColors />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
