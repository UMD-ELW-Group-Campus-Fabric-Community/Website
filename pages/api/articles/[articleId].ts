import { NextApiRequest, NextApiResponse } from "next"
import { isStringObject } from "util/types";
import { data } from '../../../data/dummy_data'
import { articleProps } from './index'

interface ArticleApiRequest extends NextApiRequest {
    articleId: number;   
}
interface ArticleApiResponse extends Object{}

type ErrorResponse = {
  statusCode: number;
  message: string;
}


function searchArticleJson<articleProps> (articleId: string) {
  const article = data.articles.find(article => article.article_id === articleId)
    if (article) {
      return {
        ...article
      }
    }
    else {
      return null
    }
}





export default function handler(
    req: ArticleApiRequest,
    res: NextApiResponse<articleProps | ErrorResponse>
  ) {
    const { method } = req
    const { articleId } = req.query

    switch (method) {
      case 'GET':
        const article = searchArticleJson(String(articleId));
        if (article == null) {
          const response: ErrorResponse = {
            statusCode: 404,
            message: 'Article not found'
          }
          res.status(404).json(response)
          return
        }

        res.status(200).json({
          ...article
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