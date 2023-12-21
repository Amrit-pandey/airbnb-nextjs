import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/siteConfig'
import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from '@/actions/getCurrentUser'
import RentModal from '@/components/modals/RentModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/images/logo2.png',
      href: '/images/logo2.png'
    }
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster/>
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser}/>
        {children}
        </body>
    </html>
  )
}
