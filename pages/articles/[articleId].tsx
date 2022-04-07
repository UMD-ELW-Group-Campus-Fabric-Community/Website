import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { articleProps } from './index';

import { ParsedUrlQuery } from "querystring";


export const getServerSideProps: GetServerSideProps<articleProps> = async (context: GetServerSidePropsContext) => {
    const { articleId } = context.params as ParsedUrlQuery;
    const response = await fetch(`http://localhost:3000/api/articles/${articleId}`);
    const data = await response.json();
    if (response.status != 200) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            ...data
        }
    }
}


const Article: React.FC<articleProps> = ( props: articleProps ) => {
    return (
        <>
            <h1>{props.article_title}</h1>
            <p>{props.article_content}</p>
        </>
        
    )
};
export default Article;