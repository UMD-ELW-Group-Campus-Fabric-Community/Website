import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPathsResult,
} from "next";
import { articleProps } from "./index";

import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

import Loading from "../../library/components/panels/loading";
import DefaultHeader from "../../library/utils/metadata/header";
import DefaultNav, { SubNav } from "../../library/components/anchors/header";
import DefaultFooter from "../../library/components/anchors/footer";

import defaultStyle from "../../styles/pages/Default.module.css";
import style from '../../styles/pages/Articles.module.css';

/*
    NextJS will call this function to get the list of all the articles ids.
    This is used to generate the program pages; however, you cannot use this
    function to generate the program pages from an internal API (e.g. under localhost:3000/articles)

    To generate the program pages from an internal API, you can just use the server-side
    code to read the program ids from the database and then use the getStaticProps function. 
    
    This will not be sent client-side!

    REF: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
*/

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    // Call an external API endpoint to get posts
    const response = await fetch(`${process.env.API_URL}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return {
      paths: data.body.map((article: articleProps) => ({
        params: {
          articleName: article.article_title.toString(),
        },
      })),
      fallback: false,
    };
  };

export const getStaticProps: GetStaticProps<articleProps> = async (
  context: GetStaticPropsContext
) => {
  const { articleName } = context.params as ParsedUrlQuery;
  const response = await fetch(
    `${process.env.API_URL}/articles/${articleName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const article = data.body[0];

  if (data.length === 0) {
    console.log("No article found");
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...article,
    },
    revalidate: 1 * 60 * 60, // 1 hour
  };
};

const Article: NextPage<articleProps> = (article) => {
  const router = useRouter();

  if (router.isFallback) {
    console.log("Loading...");
    return <Loading message="Loading article..." />;
  }

  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader />
      <DefaultNav />

      <main className={defaultStyle.main}>
        <SubNav page="articles" current={article.article_title} />
        <div className={style.articleWrapper}>
          <article>
            <section className={style.section1}>
              <img src={article.article_picture} alt={article.article_title+ ' picture'}/>
              <h1>{article.article_title}</h1>
              <h2>
                Last Updated:{" "}
                <em>
                  {new Date(article.article_updated_at).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }
                  )}
                </em>
              </h2>
            </section>
              <hr style={{
                width: '20%',
              }}></hr>
            <section className={style.section2}>
              <p>{article.article_content}</p>
            </section>
            <hr></hr>
            <section className={style.section3}>
              {
                article.author_pic ? (
                  <div className={style.bioPicture}>
                    <img src={article.author_pic} alt={article.author_pic+' picture'} />
                  </div>
                ): null
              }
              <div className={style.bio}>
                <h2>Meet the author, {article.author}!</h2>
                <p>                 
                  {article.author_bio}
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <DefaultFooter />
    </div>
  );
};

export default Article;
