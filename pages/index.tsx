import React from 'react'
import { Page } from '@/components/Page/Page'
// import QuotePlayer from '@/components/QuotePlayer'
// import Header from '@/components/Header'
import Subscription from '@/sections/Subscription'
import Card from '@/components/Card'
import Hero from '@/components/Hero'
import Stat from '@/components/Stat'

export default function Home() {
  return (
    <Page title="Home">
      {/* <Header /> */}
      {/* <span className="px-4">
        <QuotePlayer />
      </span> */}
      <div className="flex flex-col md:flex-row md:space-x-32 min-h-screen justify-center items-center">
        <Hero />
        <Card />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-32 justify-center items-center min-h-screen space-y-4">
        <Stat />
        <Subscription />
      </div>
    </Page>
  )
}
