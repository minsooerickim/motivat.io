import Footer from '@/sections/Footer'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider forcedTheme="dark">
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}

export default App
