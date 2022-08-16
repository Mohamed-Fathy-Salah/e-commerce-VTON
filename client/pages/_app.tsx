import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DevNote from '../components/DevNote'

function MyApp({ Component, pageProps }: AppProps) {
  return <><DevNote /><Component {...pageProps} /></>
}

export default MyApp
