/** Retrieve the latest quote registered */
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function manualReviewApplication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()

  const dailyQuote = await prisma.quote.findMany({
    orderBy: {
      registeredAt: 'desc',
    },
    take: 1,
  })
  return res.status(200).json({ msg: 'retrieved daily quote', dailyQuote })
}
