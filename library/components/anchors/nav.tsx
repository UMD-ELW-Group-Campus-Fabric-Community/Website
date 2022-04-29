import Link from "next/link";
import { navRoutes } from "../../utils/_navLinks";

import styles from "../../../styles/anchors/Nav.module.css";
import { navColors } from "../../../styles/_colors";
import { hasChildren } from "../../_types";


const DefaultNav = (props: hasChildren) => {
  return (
    <div className={styles.navContainer}>
      {/* Top Banner */}
      <div
        className={styles.topBar}
        style={{
          backgroundColor: navColors.primary.background,
          color: navColors.primary.text,
        }}
      >
        <Link href={"https://umd.edu/"}>
          <a>
            <h2>UNIVERSITY OF MARYLAND</h2>
          </a>
        </Link>
      </div>

      {/* Bottom Banner */}
      <div
        className={styles.bottomBar}
        style={{
          backgroundColor: navColors.secondary.background,
          color: navColors.secondary.text,
        }}
      >
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <img src="/img/umd_logo.png" alt="UMD Logo" />
              <h1>
                Experiential <br />
                Learning
              </h1>
            </a>
          </Link>
        </div>
        <nav>
          <ul>
            {navRoutes.map((route, index) => (
              <li key={index}>
                <Link href={route.route}>
                  <a>{route.name}</a>
                </Link>
                {/* Potential for Icons next to Nav elements */}
                {/* {
                                    route.icon &&
                                    <img src={route.icon.url} alt={route.icon.alt} />
                                } */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {props.children}
    </div>
  );
};

type ExtendedNavProps = {
  width?: number;
  height?: number;
  image_src: string;
  image_alt: string;
  overlay_text?: string;
};
export const ExtendedNav = (props: ExtendedNavProps) => {
  return (
    <DefaultNav>
      <div className={styles.extendedImage}>
        <img
          src={props.image_src}
          alt={props.image_alt}
        />
        {
          props.overlay_text &&
          <h1 style={{
            color: navColors.primary.text,
          }}>{props.overlay_text}</h1>
        }
      </div>
    </DefaultNav>
  );
};

type SubNavProps = {
  page: string;
  current?: string;
};
export const SubNav = (props: SubNavProps) => {
  // useEffect(() => {
  //     const route = navRoutes.find(route => route.route === props.page);

  const routes = navRoutes.find((route) => {
    if (route.name.toLowerCase() == props.page) {
      return route;
    }
  });

  return (
    <nav className={styles.subNav} key={'test'}>
        <ul>
        {routes?.full?.split("/").map((route, index) => {
            return (
                <li key={index}>
                    <Link href={
                        route.toLowerCase() === "home" ? "/" : `/${route.toLowerCase()}`
                    }>
                        <a>{route}</a>
                    </Link>
                </li>
            );
        })}
        {
            props.current &&
            <li key={props.current}>
                <Link href={`/${props.page}`}>
                    <a>{props.current}</a>
                </Link>
            </li>
        }
        </ul>
    </nav>
  );
};

export default DefaultNav;
