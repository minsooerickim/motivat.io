import React from "react"
import SliderComponent from "@/components/SliderComponent"
import { Page } from "@/components/Page/Page"
import QuotePlayer from "@/components/QuotePlayer"

export default function Home() {
  return (
    <Page title="Home">
      <QuotePlayer />
      <SliderComponent />
    </Page>
  )
}