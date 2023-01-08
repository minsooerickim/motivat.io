import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

export default async function manualReviewApplication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const prisma = new PrismaClient()

  const emailSubscribers = await prisma.subscription.findUnique({
    where: {
      subscriptionId: 'email',
    },
    include: {
      users: true,
    },
  })

  const quoteObj = await axios.get('http://api.quotable.io/random?')
  const quoteContent = quoteObj.data.content
  const quoteAuthor = quoteObj.data.author

  emailSubscribers.users.forEach(async (subscriber) => {
    if (subscriber['email'] != null) {
      const msg = {
        to: subscriber['email'],
        from: 'minsooerickim@gmail.com', // Use the email address or domain you verified above
        subject: 'Daily Motivational Quote',
        text: quoteAuthor,
        html:
          '<strong>' + quoteContent + '</strong>' + '<br></br>' + quoteAuthor,
      }
      await sgMail.send(msg).then(
        () => {
          console.log('successfully sent email to ' + subscriber['email'])
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: { response: { body: any } }) => {
          console.error(error)
          if (error.response) {
            console.error(error.response.body)
          }
        }
      )
    }
  })

  //TODO: pretty email using templates
  // await sendEmail({
  //       // email: subscriber['email'],
  //       email: 'minsooerickim@gmail.com',
  //       quote: quoteContent,
  //       author: quoteAuthor,
  //       template_id: process.env.SENDGRID_APPLICATION_ACCEPTANCE_EMAIL_TEMPLATE_ID,
  //     })

  // const { email, quote, author } = req.body

  // await sendEmail({
  //   email: email,
  //   quote: quote,
  //   author: author,
  //   template_id: process.env.SENDGRID_APPLICATION_ACCEPTANCE_EMAIL_TEMPLATE_ID,
  // })
  res.status(200).json({})
}
