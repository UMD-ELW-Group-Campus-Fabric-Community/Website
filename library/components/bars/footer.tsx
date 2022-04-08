import { NextPage } from 'next';
import Image from 'next/image';

import styles from '../../../styles/Home.module.css';


const DefaultFooter = () => {

    return (
        <footer className={styles.footer}>
            <span className={styles.logo}>                
                <h3>This is a footer</h3>
            </span>            
        </footer>
    )
};

export default DefaultFooter;