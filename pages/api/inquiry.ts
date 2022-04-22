// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type defaultResponse = {
  statusCode: number;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<defaultResponse>
) {
  const { method, body } = req
  switch (method) {
    case 'POST':
        res.status(200).json({
            statusCode: 200,    
            message: `Thanks for the request. Included: ${body}`
        })
        break
    default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
  }
  return;
}
