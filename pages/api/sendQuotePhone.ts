import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function sendQuotePhone(res: NextApiResponse) {
  const prisma = new PrismaClient()

  const emailSubscribers = await prisma.subscription.findUnique({
    where: {
      subscriptionId: 'phone',
    },
    include: {
      users: true,
    },
  })
  console.log(emailSubscribers)
  // const { email, quote, author } = req.body

  // await sendEmail({
  //   email: email,
  //   quote: quote,
  //   author: author,
  //   template_id: process.env.SENDGRID_APPLICATION_ACCEPTANCE_EMAIL_TEMPLATE_ID,
  // })
  res.status(200).json({})
}
