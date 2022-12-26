import React from 'react'
import { Page } from '@/components/Page/Page'
import QuotePlayer from '@/components/QuotePlayer'
import Header from '@/components/Header'
import Subscription from '@/sections/Subscription'

export default function Home() {
  return (
    <Page title="Home">
      <Header />
      <span className="px-4">
        <QuotePlayer />
      </span>
      <Subscription />
    </Page>
  )
}
