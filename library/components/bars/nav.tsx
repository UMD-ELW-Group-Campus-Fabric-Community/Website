import Link from 'next/link';
import { navRoutes } from '../../utils/_navLinks';

import styles from '../../../styles/anchors/Nav.module.css'
import { navColors } from '../../../styles/_colors';

const DefaultNav = () => {

    return (
        <div className={styles.navContainer}>
            {/* Top Banner */}
            <div className={styles.topBar}
            style={{
                backgroundColor: navColors.primary.background,
                color: navColors.primary.text
            }}>
                <Link href={'https://umd.edu/'}>
                    <a>    
                        <h2>UNIVERSITY OF MARYLAND</h2>
                    </a>
                </Link>
            </div>

            {/* Bottom Banner */}
            <div className={styles.bottomBar}
            style={{
                backgroundColor: navColors.secondary.background,
                color: navColors.secondary.text
            }}>                
                <div className={styles.logo}>
                    <Link href="/">
                        <a>
                            {/* <img src='../../../static/favicon.ico' alt="University Logo" /> */}
                            <h1>Experiential <br/>Learning</h1>
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
        </div>
    )
};

export default DefaultNav;