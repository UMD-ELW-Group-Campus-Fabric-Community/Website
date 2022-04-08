import { NextApiRequest, NextApiResponse } from "next"
import { data } from '../../../data/dummy_data'
import { programProps } from './index'

interface programApiRequest extends NextApiRequest {
    programId: number;   
}

type ErrorResponse = {
  statusCode: number;
  message: string;
}


function searchprogramJson<programProps> (programId: string) {
  const program = data.programs.find(program => program.program_id === programId)
    if (program) {
      return {
        ...program
      }
    }
    else {
      return null
    }
}

export default function handler(
    req: programApiRequest,
    res: NextApiResponse<programProps | ErrorResponse>
  ) {
    const { method } = req
    const { programId } = req.query

    switch (method) {
      case 'GET':
        const program = searchprogramJson(String(programId));
        if (program == null) {
          const response: ErrorResponse = {
            statusCode: 404,
            message: 'program not found'
          }
          res.status(404).json(response)
          return
        }

        res.status(200).json({
          ...program
        })
        return
        
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