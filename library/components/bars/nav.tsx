import Link from 'next/link';
import { navRoutes } from '../../utils/_navLinks';

import styles from '../../../styles/Home.module.css'

const DefaultNav = () => {

    return (
        <nav>
            <ul>
                {navRoutes.map((route, index) => (
                    <li key={index}>
                        <Link href={route.route}>
                            <a>{route.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default DefaultNav;