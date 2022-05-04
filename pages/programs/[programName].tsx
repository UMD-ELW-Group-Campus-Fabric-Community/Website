import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPathsResult,
} from "next";
import { programProps } from "./index";

import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

import DefaultHeader from "../../library/utils/metadata/header";
import DefaultNav, { SubNav } from "../../library/components/anchors/header";
import DefaultFooter from "../../library/components/anchors/footer";

import defaultStyle from "../../styles/pages/Default.module.css";
import styles from "../../styles/pages/Programs.module.css";
import { formColors } from "../../styles/_colors";
import Link from "next/link";

/*
    NextJS will call this function to get the list of all the program ids.
    This is used to generate the program pages; however, you cannot use this
    function to generate the program pages from an internal API (e.g. under localhost:3000/programs)

    To generate the program pages from an internal API, you can just use the server-side
    code to read the program ids from the database and then use the getStaticProps function. 
    
    This will not be sent client-side!

    REF: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
*/

export const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const response = await fetch(`${process.env.API_URL}/programs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return {
      paths: data.body.map((program: programProps) => ({
        params: {
          programName: program.program_name.toString(),
        },
      })),
      fallback: false,
    };
  };

export const getStaticProps: GetStaticProps<programProps> = async (
  context: GetStaticPropsContext
) => {
  const { programName } = context.params as ParsedUrlQuery;
  const response = await fetch(
    `${process.env.API_URL}/programs/${programName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  const program = data.body[0];

  if (response.status != 200) {
    console.log("No program found");
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...program,
    },
    revalidate: 1 * 60 * 60, // 1 hour
  };
};

const Program: NextPage<programProps> = (program) => {
  const router = useRouter();
  const program_focus =
    "[" +
    program.program_focus.substring(1, program.program_focus.length - 1) +
    "]";

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader />
      <DefaultNav />
      <main className={defaultStyle.main}>
        <SubNav page="programs" current={program.program_name} />
        <div className={styles.programWrapper}>
          <h2>{program.program_name}</h2>
          <img src={program.program_image} />
          <h3>Who We Are</h3>
          <p>
            {program.program_description}
            <br />
          </p>
          <p>
            If you want to learn more, visit the {program.program_name}&#39;s
            website (
            <Link href={program.program_website}>
              <a>here</a>
            </Link>
            ), or fill out an {" "}
            <Link href={"/inquiry"}>
              <a>Inquiry Form</a>
            </Link>
            .
          </p>
          <h3>Program Focus</h3>
          <div className={styles.focusContainer}>
            {JSON.parse(program_focus).map((focus: any, index: number) => (
              <div className={styles.focus} key={focus.focus + "-" + index}>
                <img src={focus.src} alt={focus.title + " icon"} />
                <h4>{focus.title}</h4>
              </div>
            ))}
          </div>
          <p>
            Structured as consulting engagements, faculty-led student teams
            provide project management and execution for your information
            challenges and business needs. Projects are culminating learning
            experiences for our undergraduate and graduate students.
          </p>

          <div className={styles.program}>
            <h3>Interesed in working with our students?</h3>
            <button
              type="button"
              style={{
                backgroundColor: formColors.button.primary,
              }}
              onClick={() => {
                router.push("/inquiry");
              }}
            >
              Reach out to us
            </button>
          </div>
        </div>
      </main>
      <DefaultFooter />
    </div>
  );
};
export default Program;
