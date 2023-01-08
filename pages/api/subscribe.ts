/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { validateEmail } from '@/utility/methods'

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const prisma = new PrismaClient()
  const reqLen = Object.keys(req.body).length

  // if both email and phone
  // TODO: still need to find a phone api provider
  if (reqLen == 2) {
    const { email, phone } = req.body

    // input validation
    // TODO: validate phone as well
    if (!validateEmail(email)) {
      return res.status(422).json({ msg: 'invalid email address! ;(' })
    }

    const user = await prisma.user.create({
      data: {
        email: email as string,
        phone: phone as string,
        subscriptions: {
          connect: [{ subscriptionId: 'email' }, { subscriptionId: 'phone' }],
        },
      },
    })
    return res.status(200).json({ user })
  }

  // if just email
  if (req.body.hasOwnProperty('email')) {
    // TODO: make input box red somehow
    if (!validateEmail(req.body.email)) {
      return res.status(422).json({ msg: 'invalid email address! ;(' })
    }
    const user = await prisma.user.create({
      data: {
        email: req.body.email as string,
        subscriptions: { connect: { subscriptionId: 'email' } },
      },
    })

    const email = req.body.email
    const msg = {
      to: email,
      from: 'minsooerickim@gmail.com', // Use the email address or domain you verified above
      subject: 'Welcome to Motivat.io! :)',
      html:
        '<strong>' +
        'Welcome to Motivat.io. Stay motivated with our daily quotes to come!' +
        '</strong>',
    }
    await sgMail.send(msg).then(
      () => {
        return res.status(200).json({ user })
      },
      (error: { response: { body: unknown } }) => {
        console.error(error)
        if (error.response) {
          console.error(error.response.body)
          return res.status(400).json({ user })
        }
      }
    )
  }

  // if just phone
  else {
    // TODO: add input validation
    const user = await prisma.user.create({
      data: {
        phone: req.body.phone as string,
        subscriptions: { connect: { subscriptionId: 'phone' } },
      },
    })
    return res.status(200).json({ user })
  }
}
