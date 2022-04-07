import { NextApiRequest, NextApiResponse } from "next"
import { data } from '../../../data/dummy_data'

export type articleProps = {
  user_id:              string;
  user_fname:           string;
  user_lname:           string;
  article_id:           string;
  article_title:        string;
  article_content:      string;
  article_created_at:   string;
  article_updated_at:   string;
  organization_id:      string;
  organization_name:    string;
  organization_website: string;
}

type articlesProps = {
  articles: articleProps[];
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<articlesProps>
  ) {
    const { method } = req
    switch (method) {
      case 'GET':
        res.status(200).json(
          {
            articles: data.articles
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