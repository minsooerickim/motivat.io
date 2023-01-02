import { NextApiResponse } from 'next'

export default async function sendQuotePhone(res: NextApiResponse) {
  return res.status(200).json({})
  //   const prisma = new PrismaClient()

  // TODO: create login system first
  //   const savedQuote = await prisma.user.update({
  //     where: {},
  //   })
}
