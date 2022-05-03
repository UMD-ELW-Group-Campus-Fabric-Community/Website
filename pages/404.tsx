import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

import DefaultHeader from '../library/utils/metadata/header'
import DefaultNav from '../library/components/anchors/header'
import DefaultFooter from '../library/components/anchors/footer'

import defaultStyle from '../styles/pages/Default.module.css'

const _404 = () => {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/')
        }, 5000)
    }, [router])
    
    return (
        <div className={defaultStyle.container}>
          {/* This is the head of the DOM, not of the body */}
            <DefaultHeader/>
            <DefaultNav/>
            <main className={defaultStyle.main}>
                <h1>404</h1>
                <p> 
                    Page not found. Hold tight, you are being redirected...
                </p>
                <p>
                    If you were not redirected, please click 
                    <Link href={'/'}>
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