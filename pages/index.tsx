import type { NextPage } from "next";
import { useRouter } from "next/router";

import DefaultHeader from "../library/utils/metadata/header";
import { ExtendedNav } from "../library/components/anchors/header";
import DefaultFooter from "../library/components/anchors/footer";

import defaultStyle from "../styles/pages/Default.module.css";
import styles from "../styles/pages/Home.module.css";
import { HomePageColors } from "../styles/_colors";

const Home: NextPage = () => {
  const router = useRouter();
  const panels = [
    // {
    //   title: "Past Projects",
    //   src: "/img/home/past_projects.jpg",
    //   target: ''
    // },
    {
      title: "Browse Programs",
      src: "/img/home/programs.jpg",
      target: "/programs",
    },
    {
      title: "What's New",
      src: "/img/home/news.jpg",
      target: "/articles",
    },
    {
      title: "Reach Out",
      src: "/img/home/inquire.jpg",
      target: "/inquire",
    },
  ];

  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader />
      <ExtendedNav
        image_src="/img/home/main_image.jpg"
        image_alt="Main Body Image"
        overlay_text="Learn more with us!"
      />

      <main className={defaultStyle.main}>
        <div className={styles.wrapper}>
          <div className={styles.subBody}>
            <h2
              style={{
                color: HomePageColors.text.head,
              }}
            >
              About the Experiential Learning Program
            </h2>
            <p>
              The Experimental Learning Program set out to bring the real world
              into our classroom by partnering with local organizations and
              company. Through the learning experience, students will get to
              work alongside out partners to solve their business needs ranging
              from UX/UI design to information management. These projects are
              designed as culminating learning experience for our undergraduate
              and graduate students to take their first steps into a
              professional working environment.
            </p>
          </div>
          <div className={styles.imageBody}>
            {panels.map((panel, index) => (
              <div
                key={index}
                className={styles.imagePanels}
                onClick={() => {
                  router.push(panel.target);
                }}
              >
                <img src={panel.src} alt={panel.title} />
                <h3
                  style={{
                    color: HomePageColors.text.over,
                  }}
                >
                  {panel.title}
                </h3>
              </div>
            ))}
          </div>
          <div className={styles.subBody}>
            <h2
              style={{
                color: HomePageColors.text.head,
              }}
            >
              Connect with programs campus wide to...
            </h2>
            <div>
              <h3>Engage/sponsor consulting projects</h3>
              <div className={styles.offsetText}>
                {/* <div className={styles.verticleLine}
              style={{
                backgroundColor: HomePageColors.lines
              }}></div> */}
                <p className={styles.bar}>
                  From initial scoping to transferring final deliverables, our
                  programs are managed and provided support to ensure a
                  successful project that meets your needs and a good learning
                  experience for students. Schedule a meeting with us to share
                  your information challenges, and we will determine the
                  appropriate university course, instructor, and student team
                  that can develop a product to meet your business needs.
                </p>
              </div>
            </div>
            <div>
              <h3>Recruit interns & hire future grads</h3>
              <div className={styles.offsetText}>
                {/* <div className={styles.verticleLine}
              style={{
                backgroundColor: HomePageColors.lines
              }}></div> */}
                <p className={styles.bar}>
                  Projects with the Experiential Learning Program provide
                  insight into student skillsets, work effort, and talent prior
                  to graduation because our partners engage directly with
                  student teams throughout the semester. Opportunities include
                  attending and participating in hosts events such as career
                  fairs and mock-interviews, holding site visits, and sharing
                  job postings across through our email board.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DefaultFooter />
    </div>
  );
};

export default Home;
