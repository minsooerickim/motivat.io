import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { validateEmail } from '@/utility/methods'

export default async function manualReviewApplication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()
  const reqLen = Object.keys(req.body).length

  // if both email and phone
  if (reqLen == 2) {
    const { email, phone } = req.body

    // input validation
    // TODO: validate phone as well
    if (!validateEmail(email)) {
      return res.status(422).json({ msg: 'invalid email address! ;('})
    }

    const user = await prisma.user.create({
      data: {
        email: email as string,
        phone: phone as string,
        subscriptions: { 
          connect: [
            { subscriptionId: 'email' },
            { subscriptionId: 'phone' },
          ] 
        },
      }
    })
    return res.status(200).json({ user })
  }

  // if just email
  if (req.body.hasOwnProperty('email')) {
    // TODO: make input box red somehow
    if (!validateEmail(req.body.email)) {
      return res.status(422).json({ msg: 'invalid email address! ;('})
    }
    const user = await prisma.user.create({
      data: {
        email: req.body.email as string,
        subscriptions: { connect: { subscriptionId: 'email' } },
      }
    })
    return res.status(200).json({ user })
  }

  // if just phone
  else {
    // TODO: add input validation
    const user = await prisma.user.create({
      data: {
        phone: req.body.phone as string,
        subscriptions: { connect: { subscriptionId: 'phone' } },
      }
    })
    return res.status(200).json({ user })
  }

}
