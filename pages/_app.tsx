import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  )
}

export default App
