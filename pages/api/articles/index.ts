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
type ErrorResponse = {
  statusCode: number;
  message: string;
}

function getAllArticles () {
  return {
    articles: data.articles
  }
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<articlesProps | ErrorResponse>
  ) {
    const { method } = req
    switch (method) {
      case 'GET':
        const articles = getAllArticles();
        if (articles == null) {
          const response: ErrorResponse = {
            statusCode: 404,
            message: 'Articles not found'
          }
          res.status(404).json(response)
          return
        }
        res.status(200).json({
          ...articles
        })
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  }