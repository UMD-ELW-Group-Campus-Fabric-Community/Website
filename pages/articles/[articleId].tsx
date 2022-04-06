import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { articleProps } from './index';

import { ParsedUrlQuery } from "querystring";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { articleId } = context.params as ParsedUrlQuery;
    const response = await fetch(`http://localhost:1433/api/articles/${articleId}`);
    const data = await response.json();

    if (!data){
        return {
            notFound: true
        }
    }
    return {
        props: {
           ...data[0]
        }
    }
}


const Article: React.FC<articleProps> = ( props: articleProps ) => {
    return (
        <div>
            <h1>{props.article_title}</h1>
            <p>{props.article_content}</p>
            <p>{props.article_created_at}</p>
            <p>{props.article_updated_at}</p>
            <p>{props.user_id}</p>
        </div>
    )
};
export default Article;