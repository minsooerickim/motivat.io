import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function manualReviewApplication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quote, quoteAuthor, quoteTag } = req.body
  if (quote == '') {
    return res.status(400).json({ message: 'empty string received' })
  }
  const prisma = new PrismaClient()

  //   check if quote already exists
  const quoteCount = await prisma.quote.count({
    where: {
      AND: [
        {
          quote: quote,
          quoteAuthor: quoteAuthor,
          quoteTag: quoteTag,
        },
      ],
    },
  })
  if (quoteCount > 0) {
    return res.status(200).json({ message: 'quote already exists in the db' })
  }

  //   add quote to db if it doesn't already exist
  const created_quote = await prisma.quote.create({
    data: {
      quote: quote,
      quoteAuthor: quoteAuthor,
      quoteTag: quoteTag,
    },
  })

  return res.status(200).json({ created_quote })
}
