import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'MpD — Movimento para Democracia Cabo Verde',
  description: 'O Movimento para a Democracia, conhecido também pela sigla MpD, é um partido político de centro-direita de Cabo Verde. Esteve no poder entre 1991 e 2001. Os seus membros têm como alcunha &quot;os ventoinhas&quot;, por causa do emblema do partido que faz lembrar uma ventoinha, e identificam-se com a cor verde.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
        <Toaster position="top-center" expand={false} richColors />
      </body>
    </html>
  )
}
