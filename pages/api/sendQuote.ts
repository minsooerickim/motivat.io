import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '@/lib/sendgrid'

export default async function manualReviewApplication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, quote, author } = req.body

  await sendEmail({
    email: email,
    quote: quote,
    author: author,
    template_id: process.env.SENDGRID_APPLICATION_ACCEPTANCE_EMAIL_TEMPLATE_ID,
  })
  res.status(200).json({})
}
