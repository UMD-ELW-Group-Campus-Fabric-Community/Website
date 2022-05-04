import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import React, { useEffect } from "react";

import DefaultHeader from "../../library/utils/metadata/header";
import DefaultNav, { SubNav } from "../../library/components/anchors/header";
import DefaultFooter from "../../library/components/anchors/footer";

import defaultStyle from "../../styles/pages/Default.module.css";
import searchStyles from "../../styles/components/Search.module.css";
import styles from "../../styles/pages/Article.module.css";
import { SearchColors } from "../../styles/_colors";

import { useWindowDimensions } from "../../library/utils/windowDimensions";

export type articleProps = {
  article_id: number;
  article_title: string;
  article_content: string;
  article_picture: string;
  article_created_at: Date;
  article_updated_at: Date;
  organization_id: number;
  author: string;
  author_pic: string;
  author_bio: string;
};

type articlesProps = {
  articles: articleProps[];
};

export const getStaticProps: GetStaticProps<articlesProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status != 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      articles: data.body,
    },
    revalidate: 1 * 60 * 60, // 1 hour
  };
};

const Articles: NextPage<articlesProps> = ({ articles }) => {
  const [selectedArticles, _] = React.useState<articleProps[]>(articles);
  const [search, setSearch] = React.useState<string>("");
  const [filters, setFilters] = React.useState<string[]>([]);
  const [wordLimit, setWordLimit] = React.useState<number>(200);
  const { width, height } = useWindowDimensions();

  const modIncludes = (value: string, target: string) => {
    return value.toLowerCase().includes(target.toLowerCase()) ? value : null;
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  const updateWordLimit = () => {
    if (width < 768) {
      setWordLimit(100);
    } else if (width < 425){
      setWordLimit(50);
    } else {
      setWordLimit(200);
    }
  }

  useEffect(() => {
    updateWordLimit();
  }, [width]);

  useEffect(() => {
    updateWordLimit();
  }, []);
  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader />
      <DefaultNav />

      <main className={defaultStyle.main}>
        <SubNav page="articles" />
        <div
          className={searchStyles.searchContainer}
          style={{
            backgroundColor: SearchColors.background.secondary,
            color: SearchColors.text.secondary,
          }}
        >
          {/* Search bar thats filters selected articles */}
          <div className={searchStyles.searchHead}>
            <div className={searchStyles.icon}>
              <img src={"/icons/articles.png"} alt="Articles Icon"></img>
              <h1>Articles</h1>
            </div>
            <input
              type="text"
              placeholder="Search Articles"
              className={styles.search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  const text = e.currentTarget.value;
                  if (!filters.includes(text)) {
                    setFilters([...filters, text]);
                    e.currentTarget.value = "";
                    setSearch("");
                  }
                }
              }}
            />
          </div>
          {/* Filters */}
          {
            filters.length > 0 && (
              <div className={searchStyles.filterContainer}>
              <hr />
              <div className={searchStyles.filterWrapper}>
                {filters.map((filter, index) => {
                  return (
                    <div
                      key={index}
                      className={searchStyles.filter}
                      onClick={() => {
                        const newFilters = [...filters];
                        newFilters.splice(newFilters.indexOf(filter), 1);
                        setFilters(newFilters);
                      }}
                      style={{
                        backgroundColor: SearchColors.background.fill,
                        color: SearchColors.text.secondary,
                      }}
                    >
                      <h5> 🞨 {filter}</h5>
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
           
            )
          }
          {/* Selected Articles */}
          <div
            className={styles.articleContainer}
            style={{
              backgroundColor: SearchColors.background.primary,
              color: SearchColors.text.primary,
            }}
          >
            {selectedArticles
              .filter((article) => {
                if (filters.length === 0) {
                  return article;
                }
                return filters.every((filter) => {
                  return (
                    modIncludes(article.article_title, filter) ||
                    modIncludes(article.article_content, filter) ||
                    modIncludes(article.author, filter)
                  );
                });
              })
              .filter((article) => {
                if (search === "") {
                  return article;
                } else if (
                  modIncludes(article.article_title, search) ||
                  modIncludes(article.article_content, search) ||
                  modIncludes(article.author, search)
                ) {
                  return article;
                }
                return null;
              })
              .map((article) => {
                return (
                  <div
                    key={article.article_id}
                    className={styles.article}
                    style={{
                      backgroundColor: SearchColors.background.fill,
                    }}
                  >
                    <h2>{article.article_title}</h2>
                    <h6>
                      Written by {article.author}
                      .{" "}
                      <em>
                        Last Updated:{" "}
                        {formatDate(article.article_updated_at.toString())}
                      </em>{" "}
                    </h6>
                    <p>{
                        article.article_content.length > wordLimit ?
                        article.article_content.substring(0, wordLimit) + "..." :
                        article.article_content
                      }</p>
                    <button
                      className={styles.readMore}
                      onClick={() => {
                        window.location.href = `/articles/${article.article_title}`;
                      }}
                      style={{
                        backgroundColor: SearchColors.button.primary,
                        color: SearchColors.text.over,
                      }}
                    >
                      Read More
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>

      <DefaultFooter />
    </div>
  );
};

export default Articles;
