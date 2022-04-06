// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req
  switch (method) {
    case 'GET':
      res.status(200).json({ name: 'John Doe' })
      break
    case 'POST':
      res.status(201).end()
      break
    case 'PUT':
      res.status(204).end()
      break
    case 'DELETE':
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
