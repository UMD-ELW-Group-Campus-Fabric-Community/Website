import { NextApiRequest, NextApiResponse } from "next"
import { data } from '../../../data/dummy_data'

export type programProps = {
    program_id:             string;
    program_name:           string;
    program_description:    string;
    program_website:        string;
    program_focus:          string[];
    department_id:          string;
    department_name:        string;
    organization_id:        string;
    organization_name:      string;
}

type programsProps = {
  programs: programProps[];
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<programsProps>
  ) {
    const { method } = req
    switch (method) {
      case 'GET':
        res.status(200).json(
          {
            programs: data.programs
          }
        )
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