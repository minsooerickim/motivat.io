import Footer from '@/sections/Footer'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <ThemeProvider forcedTheme="dark">
        <Toaster />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default App
