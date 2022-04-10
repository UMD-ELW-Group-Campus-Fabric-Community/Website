import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

import styles from '../styles/Home.module.css'

import DefaultHeader from '../library/utils/metadata/header'
import DefaultNav from '../library/components/bars/nav'
import DefaultFooter from '../library/components/bars/footer'

const _404 = () => {

    const router = useRouter()

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/')
        }, 5000)
    }, [])

    
    return (
        <div className={styles.container}>
          {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            <main>
                <h1>404</h1>
                <p> 
                    Page not found. Hold tight, you are being redirected...
                </p>
                <p>
                    If you were not redirected, please click 
                    <Link href={'/'} as='/'>
                        <a> here</a>
                    </Link>
                    .
                </p>
                

            </main>
            <DefaultFooter />

        </div>

    );
};

export default _404;