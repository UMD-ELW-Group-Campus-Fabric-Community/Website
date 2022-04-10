import { 
    NextPage, 
    GetStaticProps, 
    GetStaticPropsContext, 
    GetStaticPaths,
    GetStaticPathsResult} from "next";
import { articleProps } from './index';

import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

import Loading from '../../library/components/panels/loading';
import DefaultHeader from '../../library/utils/metadata/header'
import DefaultNav from '../../library/components/bars/nav'
import DefaultFooter from '../../library/components/bars/footer'

import styles from '../../styles/Home.module.css'


/*
    NextJS will call this function to get the list of all the articles ids.
    This is used to generate the program pages; however, you cannot use this
    function to generate the program pages from an internal API (e.g. under localhost:3000/articles)

    To generate the program pages from an internal API, you can just use the server-side
    code to read the program ids from the database and then use the getStaticProps function. 
    
    This will not be sent client-side!

    REF: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
*/

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
    // Call an external API endpoint to get posts
    const response = await fetch("http://localhost:1433/api/articles", {      
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return {
        paths: data.map((article: articleProps) => ({
            params: {
                articleId: article.article_id.toString()
            }
        })),
        fallback: true
    }
}


export const getStaticProps: GetStaticProps<articleProps> = async (context: GetStaticPropsContext) => {
    const { articleId } = context.params as ParsedUrlQuery;
    const response = await fetch(`http://localhost:1433/api/articles/${articleId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    const article = data[0];
    
    if (data.length === 0) {
        console.log("No article found");
        return {
            notFound: true
        }
    }
    return {
        props: {
            ...article
        },
        revalidate: 1 * 60 * 60 // 1 hour
    }
}

const Article: NextPage<articleProps> = ( article ) => {
    
    const router = useRouter();

    if(router.isFallback) {
        return <Loading message="Loading article..." />        
    }

    return (
        <div className={styles.container}>
            {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            
            <main className={styles.main}>
                <h1>{article.article_title}</h1>
                <p>{article.article_content}</p>
            </main>

            <DefaultFooter />   

        </div>
        
    )
};


export default Article;