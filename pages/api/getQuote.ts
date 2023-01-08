import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { GET_CONFIG } from '@/utility/const'

export default async function manualReviewApplication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GETs the quote and sets the according properties
  await axios
    .get('https://api.quotable.io/random?maxLength=200', GET_CONFIG)
    .then(async function (res) {
      const quote = res.data.content
      const quoteAuthor = res.data.author
      const quoteTag = res.data.tags[0]
      await axios.post(
        'https://motivation-quote-generator.fly.dev/api/registerQuote',
        {
          quote,
          quoteAuthor,
          quoteTag,
        }
      )
    })
  return res.status(200).json({ msg: 'registered a new quote' })
}
