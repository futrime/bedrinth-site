import { inter } from './ui/fonts'
import './ui/global.css'
import Header from './ui/header'

export default function Layout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
