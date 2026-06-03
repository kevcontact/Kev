import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { AppShell } from '@/components/AppShell'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KEV — Photographer & Director',
  description:
    'KEV is a photographer and music-video director. Latin music culture and fashion editorial — campaigns, album cycles, music videos and brand collaborations.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
