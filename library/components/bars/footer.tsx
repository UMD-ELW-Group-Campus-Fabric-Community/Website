import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../../styles/anchors/Footer.module.css';
import { footerColors } from '../../../styles/_colors';

const DefaultFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.topBar}
                style={{
                    backgroundColor: footerColors.primary.background,
                    color: footerColors.primary.text
                }}
            >
                
                <div className={styles.logo}>
                    <Link href="/">
                        <a>
                            {/* <img src='../../../static/favicon.ico' alt="University Logo" /> */}
                            <h1>Experiential Learning</h1>
                        </a>
                    </Link>
                </div>
                <div>
                    <p><b>Contact Us</b><br/>College Park, Maryland 20742, USA · 301.405.1000</p>
                </div>
            </div>
            <span></span>
            <div className={styles.bottomBar}
                style={{
                    backgroundColor: footerColors.secondary.background,
                    color: footerColors.secondary.text
                }}
            >
                <ul>
                    <Link href="https://umd.edu/privacy-notice">
                        <a target={'_blank'}>
                            Privacy Notice
                        </a>
                    </Link>
                    <Link href="https://umd.edu/web-accessibility">
                        <a target={'_blank'}>
                            Web Accessibility
                        </a>
                    </Link>
                    <Link href="#">
                        <a>
                            &#169; 2022
                        </a>
                    </Link>
                </ul>
            </div>
        </footer>
    )
};

export default DefaultFooter;