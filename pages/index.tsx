import React from 'react'
import SliderComponent from '@/components/SliderComponent'
import { Page } from '@/components/Page/Page'
import QuotePlayer from '@/components/QuotePlayer'
import Header from '@/components/Header'

export default function Home() {
  return (
    <Page title="Home">
      <Header />
      <QuotePlayer />
      <SliderComponent />
    </Page>
  )
}
