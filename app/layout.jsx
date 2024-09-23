import { Layout } from '@/components/Layout'
import '@/global.css'
import { Nothing_You_Could_Do } from 'next/font/google'

export const metadata = {
  title: 'Not everyone can dream',
  description: 'Start dreaming with me',
}

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${nothingYouCouldDo.className}`}>
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
